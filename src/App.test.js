import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders toko happy heading", async () => {
  render(<App />);
  const headingElement = await screen.findByText(/semua kebutuhan harian terasa lebih hangat di toko happy/i);
  expect(headingElement).toBeInTheDocument();
});
