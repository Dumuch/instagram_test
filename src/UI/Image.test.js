import Image from "./Image";
import { describe, it } from "@jest/globals";
import expect from "expect";
import { render, waitFor } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { act } from "react-test-renderer";

const TEST_URI = 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png';
describe("Image component", () => {
  it("should render ActivityIndicator when isLoading is true", () => {
    const { getByTestId } = render(<Image uri={TEST_URI} />);
    const activityIndicator = getByTestId("activity-indicator");

    expect(activityIndicator).toBeTruthy();
  });

  it("should not render ActivityIndicator when isLoading is false", async () => {
    const { queryByTestId, getByTestId } = render(<Image uri={TEST_URI} />);
    const imageNative = getByTestId("image-native");
    await act(() => {
      imageNative.props.onLoad();
    });
    await waitFor(() => {
      const activityIndicator = queryByTestId("activity-indicator");
      expect(activityIndicator).toBeNull();
    });
  });

  it("should render ImageNative with correct uri and style", () => {
    const { getByTestId } = render(<Image uri={TEST_URI} />);
    const imageNative = getByTestId("image-native");

    expect(imageNative.props.source.uri).toBe(TEST_URI);
    expect(imageNative.props.style).toEqual(expect.objectContaining(styles.image));
  });
});

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10
  },
  activityIndicator: {
    marginTop: 20,
    marginBottom: 20
  }
});
