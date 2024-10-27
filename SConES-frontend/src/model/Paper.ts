class Paper {
  paperId: number;
  title: string;
  authorsName: string[];
  supervisorsName: string[];
  pdfUrl: string;

  constructor(
    paperId: number,
    title: string,
    authorsName: string[],
    supervisorsName: string[],
    pdfUrl: string
  ) {
    this.paperId = paperId;
    this.title = title;
    this.authorsName = authorsName;
    this.supervisorsName = supervisorsName;
    this.pdfUrl = pdfUrl;
  }
}

export default Paper;
