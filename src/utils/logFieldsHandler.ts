export default (e: Event) => {
  e.preventDefault();

  if (!e.target) {
    return;
  }

  console.log(
    Object.values(e.target)
      .filter((el) => el.tagName === "INPUT")
      .reduce((acc, current) => {
        acc[current.name] = current.value;

        return acc;
      }, {})
  );
};
