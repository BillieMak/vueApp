describe("Example component", () => {
  test("Debe ser mayor a 10", () => {
    let value = 10;

    value = value + 1;

    expect(value).toBeGreaterThan(10);
  });
});
