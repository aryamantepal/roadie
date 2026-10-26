import { test, expect } from '@playwright/test';

test.describe('Roadie Tour Routing Agent Suite', () => {
  test('should load homepage and display header and tour planner', async ({ page }) => {
    await page.goto('/');

    // Check header branding
    await expect(page.locator('h1')).toHaveText('ROADIE');
    await expect(page.locator('#tab-nav-planner')).toBeVisible();
    await expect(page.locator('#tab-nav-receipts')).toBeVisible();
    await expect(page.locator('#tab-nav-architecture')).toBeVisible();

    // Verify tour parameters form is populated
    await expect(page.locator('#artist-name-input')).toBeVisible();
    await expect(page.locator('#btn-run-roadie-agent')).toBeVisible();
  });

  test('should render SVG route map with stops and polyline', async ({ page }) => {
    await page.goto('/');

    // Wait for tour plan to load and SVG map to appear
    const svgMap = page.locator('#tour-route-svg-map');
    await expect(svgMap).toBeVisible({ timeout: 10000 });

    // Verify stops rendered
    const stopPins = page.locator('[id^="map-stop-pin-"]');
    const count = await stopPins.count();
    expect(count).toBeGreaterThan(3);

    // Verify route diagnostics card
    await expect(page.locator('#tour-metrics-summary-card')).toBeVisible();
  });

  test('should open promoter pitch email modal with data-backed content', async ({ page }) => {
    await page.goto('/');

    // Locate the first stop's promoter pitch button
    const pitchButton = page.locator('#btn-open-pitch-1');
    await expect(pitchButton).toBeVisible({ timeout: 10000 });
    await pitchButton.click();

    // Modal should appear
    const modal = page.locator('#promoter-pitch-modal-container');
    await expect(modal).toBeVisible();
    await expect(page.locator('h3:has-text("Promoter Pitch Email")')).toBeVisible();
    await expect(page.locator('#btn-copy-pitch-email')).toBeVisible();

    // Close modal
    await page.locator('#btn-close-pitch-modal').click();
    await expect(modal).not.toBeVisible();
  });

  test('should navigate to Receipts (Backtest) and verify ground-truth metrics', async ({ page }) => {
    await page.goto('/');

    await page.locator('#tab-nav-receipts').click();

    // Verify backtest heading
    await expect(page.locator('text=The Receipts: Ground-Truth Tour Backtesting')).toBeVisible();

    // Verify comparison cards: LLM-only vs Roadie Qloo
    await expect(page.locator('text=LLM-Only Agent')).toBeVisible();
    await expect(page.locator('text=Roadie (Qloo Grounded)')).toBeVisible();

    // Switch case to Mk.gee
    const mkgeeTab = page.locator('#tab-receipts-backtest-mkgee-2024');
    if (await mkgeeTab.isVisible()) {
      await mkgeeTab.click();
      await expect(page.locator('text=Two Star & The Dream Police Tour')).toBeVisible();
    }
  });

  test('should navigate to Agent Architecture and verify 5 thin tools', async ({ page }) => {
    await page.goto('/');

    await page.locator('#tab-nav-architecture').click();

    await expect(page.locator('text=Roadie Agent Architecture & System Design')).toBeVisible();
    await expect(page.locator('text=audience_affinity')).toBeVisible();
    await expect(page.locator('text=find_venues')).toBeVisible();
    await expect(page.locator('text=local_taste')).toBeVisible();
    await expect(page.locator('text=build_route')).toBeVisible();
    await expect(page.locator('text=draft_pitch')).toBeVisible();
  });

  test('API: /api/plan should return valid tour plan structure', async ({ request }) => {
    const response = await request.post('/api/plan', {
      data: {
        name: 'Geese',
        startDate: '2026-11-06',
        endDate: '2026-11-20',
        region: 'US-East',
        capacityTier: 'club',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.artistName).toBe('Geese');
    expect(data.stops.length).toBeGreaterThan(3);
    expect(data.totalDistanceMiles).toBeGreaterThan(0);
    expect(data.executionTrace.length).toBe(5);
  });

  test('API: /api/qloo/verify should report connection status', async ({ request }) => {
    const response = await request.get('/api/qloo/verify');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('connected');
    expect(data).toHaveProperty('message');
  });
});
