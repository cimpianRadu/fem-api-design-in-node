import * as user from "../user";

describe("user handler", () => {
  it("should crete a new user", async () => {
    const req = { body: { username: "test", password: "test" } }; // mock request
    const res = {
      json({ token }) {
        expect(token).toBeDefined();
      },
    }; // mock response
    await user.createUser(req, res, () => {});
  });
});
