const Engineer = require("../lib/Engineer");

test("Can set GitHub account via constructor", () => {
  const testValue = "gitHub";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.gitHub).toBe(testValue);
});

test("getPosition() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Foo", 1, "test@test.com", "gitHub");
  expect(e.getPosition()).toBe(testValue);
});

test("Can get GitHub username via getGitHub()", () => {
  const testValue = "gitHub";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.getGitHub()).toBe(testValue);
});
