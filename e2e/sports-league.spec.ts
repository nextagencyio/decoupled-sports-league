import { test, expect } from '@playwright/test'

test.describe('Sports League - Non-demo mode', () => {
  test('homepage renders hero, stats, featured teams, and schedule', async ({ page }) => {
    await page.goto('/')
    // Hero section
    await expect(page.locator('body')).toContainText('Game On')
    await expect(page.locator('body')).toContainText('Where Champions Are Made')
    // Stats
    await expect(page.locator('body')).toContainText('Teams')
    await expect(page.locator('body')).toContainText('Active Players')
    // Featured teams
    await expect(page.locator('body')).toContainText('Featured Teams')
    await expect(page.locator('body')).toContainText('Metro Thunderbolts')
    // Schedule preview
    await expect(page.locator('body')).toContainText('Upcoming Games')
  })

  test('teams listing page shows all teams', async ({ page }) => {
    await page.goto('/teams')
    await expect(page.locator('h1')).toContainText('Teams')
    await expect(page.locator('body')).toContainText('Metro Thunderbolts')
    await expect(page.locator('body')).toContainText('Riverside Hawks')
    await expect(page.locator('body')).toContainText('Highland Wolves')
    await expect(page.locator('body')).toContainText('Central Lions')
  })

  test('team detail page renders content', async ({ page }) => {
    await page.goto('/teams/metro-thunderbolts')
    await expect(page.locator('body')).toContainText('Metro Thunderbolts')
    await expect(page.locator('body')).toContainText('Coach')
  })

  test('players listing page shows players', async ({ page }) => {
    await page.goto('/players')
    await expect(page.locator('h1')).toContainText('Players')
    await expect(page.locator('body')).toContainText('Alex Martinez')
    await expect(page.locator('body')).toContainText('Jordan Chen')
    await expect(page.locator('body')).toContainText('Chioma Okafor')
  })

  test('player detail page renders content', async ({ page }) => {
    await page.goto('/players/alex-martinez')
    await expect(page.locator('body')).toContainText('Alex Martinez')
    await expect(page.locator('body')).toContainText('forward')
  })

  test('schedule listing page shows games', async ({ page }) => {
    await page.goto('/schedule')
    await expect(page.locator('h1')).toContainText('Game Schedule')
    await expect(page.locator('body')).toContainText('Thunderbolts vs Hawks')
    await expect(page.locator('body')).toContainText('Wolves vs Lions')
  })

  test('news listing page shows articles', async ({ page }) => {
    await page.goto('/news')
    await expect(page.locator('h1')).toContainText('League News')
    await expect(page.locator('body')).toContainText('Season Preview')
    await expect(page.locator('body')).toContainText('Trade Deadline')
    await expect(page.locator('body')).toContainText('Community Day')
  })

  test('news detail page renders content', async ({ page }) => {
    await page.goto('/news/season-preview')
    await expect(page.locator('body')).toContainText('Season Preview')
    await expect(page.locator('body')).toContainText('What to Watch')
  })

  test('navigation links work', async ({ page }) => {
    await page.goto('/')
    // Navigate to teams
    await page.click('a[href="/teams"]')
    await expect(page).toHaveURL('/teams')
    await expect(page.locator('h1')).toContainText('Teams')
  })
})
