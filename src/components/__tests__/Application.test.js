import React from "react";
import axios from "axios";
import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  prettyDOM, 
  getAllByTestId, 
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
 

fireEvent.click(getByAltText(appointment, "Add"));

fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
  target: { value: "Lydia Miller-Jones" }
});
fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

fireEvent.click(getByText(appointment, "Save"));

expect(getByText(appointment, "SAVING")).toBeInTheDocument();

await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
);
expect(getByText(day, 'no spots remaining')).toBeInTheDocument();  

});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Confirm"));
  expect(getByText(appointment, "DELETING")).toBeInTheDocument();

  await waitForElement(() => getByAltText(appointment, "Add"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, '2 spots remaining')).toBeInTheDocument(); 
  //debug(); 
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

  fireEvent.click(queryByAltText(appointment, "Edit"));
  
  fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
  fireEvent.click(getByText(appointment, "Save"));
  
  expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, '1 spot remaining')).toBeInTheDocument();   
});


it("shows the save error when failing to save an appointment", async ()  => {
  const { container, debug } = render(<Application />);
  axios.put.mockRejectedValueOnce();
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
 
fireEvent.click(getByAltText(appointment, "Add"));

fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
  target: { value: "Lydia Miller-Jones" }
});
fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

fireEvent.click(getByText(appointment, "Save"));
await waitForElement(() =>
getByText(appointment, "Error! Could not save the appointment")
);
});


it("shows the delete error when failing to delete an existing appointment", async ()  => {
  const { container, debug } = render(<Application />);
  axios.put.mockRejectedValueOnce();
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

});