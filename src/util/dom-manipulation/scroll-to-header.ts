export function scrollToHeader(scrollTarget: string) {
  const scrollTargetElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, strong"
  );
  const theHeaderWhoseTextContentContainsScrollTarget = Array.from(
    scrollTargetElements
  )
    .filter((header) =>
      header.textContent?.toLowerCase().includes(scrollTarget)
    )
    .sort((a, b): 1 | 0 | -1 => {
      if (
        a.textContent?.toLowerCase().length <
        b.textContent?.toLowerCase().length
      ) {
        return 1;
      } else if (
        a.textContent?.toLowerCase().length >
        b.textContent?.toLowerCase().length
      ) {
        return -1;
      }
      return 0;
    })[0];

  if (theHeaderWhoseTextContentContainsScrollTarget) {
    theHeaderWhoseTextContentContainsScrollTarget.scrollIntoView();
  }
}
