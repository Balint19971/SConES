import { getByTestId, render } from "@testing-library/react";
import { ConferenceList } from "../../layouts/ConferenceList/ConferenceList";

describe(ConferenceList, () => {
  it("Conference list has value", () => {
    const { getByTestId } = render(<ConferenceList />);
    const conferenceElement = getByTestId("conference").textContent;
    expect(conferenceElement).toHaveValue;
  });
});
