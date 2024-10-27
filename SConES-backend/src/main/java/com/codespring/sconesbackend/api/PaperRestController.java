package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.api.exeption.*;
import com.codespring.sconesbackend.assembler.PaperAssembler;
import com.codespring.sconesbackend.dto.incoming.PaperInDTO;
import com.codespring.sconesbackend.dto.outcoming.PaperOutDTO;
import com.codespring.sconesbackend.entity.Paper;
import com.codespring.sconesbackend.entity.User;
import com.codespring.sconesbackend.service.MinioService;
import com.codespring.sconesbackend.service.PaperService;
import com.codespring.sconesbackend.service.UserService;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/papers")
public class PaperRestController {

    private final PaperService paperService;

    private final PaperAssembler paperAssembler;

    private final UserService userService;

    private final MinioService minioService;

    @GetMapping
    public ResponseEntity<List<PaperOutDTO>> getAll() {
        List<PaperOutDTO> paperOutDTOList = new ArrayList<>();
        for (Paper paper : paperService.findAll()) {
            paperOutDTOList.add(paperAssembler.toPaperOutDTO(paper, null));
        }

        return ResponseEntity.ok(paperOutDTOList);
    }

    @GetMapping("/{paperId}")
    public ResponseEntity<PaperOutDTO> getPaperById(@PathVariable("paperId") String stringPaperId) {
        try {
            long paperId = Long.parseLong(stringPaperId);

            Paper paper = paperService.getById(paperId);

            if (paper == null) {
                throw new NotFoundException(Paper.class, paperId);
            } else {
                String generatedMinioUrl = minioService.getPdfUrl(Method.GET, "scones", paper.getMinioPath());
                return ResponseEntity.ok(paperAssembler.toPaperOutDTO(paper, generatedMinioUrl));
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Paper.class, stringPaperId);
        } catch (MinioException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/by-user")
    public ResponseEntity<List<PaperOutDTO>> getAllPapersByUserId(
            @AuthenticationPrincipal UserDetails userDetails) throws MinioException {

        User user = userService.getUserByEmail(userDetails.getUsername());

        List<Paper> paperList = paperService.findByUserId(user.getUserId());
        List<PaperOutDTO> paperOutDTOList = new ArrayList<>();
        for (Paper paper : paperList) {
            String generatedMinioUrl = minioService.getPdfUrl(Method.GET, "scones", paper.getMinioPath());
            paperOutDTOList.add(paperAssembler.toPaperOutDTO(paper, generatedMinioUrl));
        }

        return ResponseEntity.ok(paperOutDTOList);
    }

    @PostMapping
    public ResponseEntity<PaperOutDTO> createPaper(@RequestBody PaperInDTO paperInDTO) throws MinioException {
        if (!paperService.existsPaperByTitle(paperInDTO.getTitle())) {
            List<User> userList = new ArrayList<>();
            for (int i = 0; i < paperInDTO.getEmails().size(); i++) {
                if (userService.getUserByEmail(paperInDTO.getEmails().get(i)) != null) {
                    userList.add(userService.getUserByEmail(paperInDTO.getEmails().get(i)));
                } else {
                    throw new NonExistentUserAdditionToPaperException(paperInDTO.getEmails().get(i));
                }
            }
            String generatedMinioUrl = minioService.getPdfUrl(Method.GET, "scones", paperInDTO.getObjectPath());

            try {
                PaperOutDTO paperOutDTO = paperAssembler.toPaperOutDTO(
                        paperService.create(paperAssembler.toPaper(paperInDTO, userList)), generatedMinioUrl);

                return ResponseEntity.ok(paperOutDTO);
            } catch (Exception e) {
                minioService.deleteFile("scones", paperInDTO.getObjectPath());
                throw new CreationFailedException(Paper.class);
            }

        } else {
            throw new CreationFailedException(Paper.class);
        }
    }

    @PutMapping("/approve/{paperId}")
    public ResponseEntity<String> approvePaper(
            @PathVariable("paperId") String stringPaperId,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long paperId = Long.parseLong(stringPaperId);
            Paper paper = paperService.findByIdWithUsers(paperId);

            if (paper == null) {
                throw new NotFoundException(Paper.class, paperId);
            }

            if (!isSupervisorAuthorized(paper, userDetails.getUsername())) {
                throw new UnauthorizedException("Unauthorized to change paper status");
            }

            paper.setApproved(true);
            paperService.update(paper);
            return ResponseEntity.ok("The paper is approved");
        } catch (NumberFormatException e) {
            throw new BadRequestException(Paper.class, stringPaperId);
        }
    }

    @PutMapping("/{paperId}")
    public ResponseEntity<String> approvePaper(
            @PathVariable("paperId") String stringPaperId,
            @RequestBody PaperInDTO paperInDTO) {
        try {
            Long paperId = Long.parseLong(stringPaperId);
            Paper paper = paperService.getById(paperId);

            if (paper == null) {
                throw new NotFoundException(Paper.class, paperId);
            }

            paper.setTitle(paperInDTO.getTitle());

            paperService.update(paper);
            return ResponseEntity.ok("The paper is approved");
        } catch (NumberFormatException e) {
            throw new BadRequestException(Paper.class, stringPaperId);
        }
    }

    @DeleteMapping("/{paperId}")
    public ResponseEntity<Boolean> deletePaper(@PathVariable("paperId") String stringPaperId) {
        try {
            Long paperId = Long.parseLong(stringPaperId);
            Paper paper = paperService.getById(paperId);

            if (paper != null) {
                minioService.deleteFile("scones", paper.getMinioPath());
                paperService.deleteById(paperId);
                return ResponseEntity.ok(true);
            } else {
                throw new NotFoundException(Paper.class, paperId);
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Paper.class, stringPaperId);
        } catch (MinioException e) {
            throw new RuntimeException(e);
        }
    }

    private boolean isSupervisorAuthorized(Paper paper, String username) {
        for (User user : paper.getParticipants()) {
            if (username.equals(user.getUsername())) {
                return true;
            }
        }
        return false;
    }
}
