import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.click("text=portfolio");
});

test.describe("Add a task", () => {
  test("should show up a new card when the add card button is clicked", async ({
    page,
  }) => {
    await page.click("text=Task Management");
    await expect(page).toHaveURL("/tasks");
    const column = page.getByTestId("To do");
    const addCardButton = column.getByText("+ Add a card");

    await addCardButton.click();

    await expect(
      page.getByPlaceholder("Enter a task for this card...")
    ).toBeVisible();
    await page.getByTestId("add-task-input").fill("New task");
    await page.keyboard.press("Enter");

    await expect(column).toContainText("New task");
  });
});
