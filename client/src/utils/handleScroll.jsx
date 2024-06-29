// Function to handle scrolling when the button is clicked
export const handleScroll = (scrollAmount,containerRef, scrollPosition, setScrollPosition) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;

    // Update the state with the new scroll position
    setScrollPosition(newScrollPosition);

    // Access the container element and set its scrollLeft property
    containerRef.current.scrollLeft = newScrollPosition;
};