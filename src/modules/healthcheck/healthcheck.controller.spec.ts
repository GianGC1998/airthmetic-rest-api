import { HealhtcheckController } from './healthcheck.controller';

describe('HealhtcheckController', () => {
  let healthcheckController: HealhtcheckController;

  beforeEach(() => {
    healthcheckController = new HealhtcheckController();
  });

  describe('Healthcheck controller', () => {
    it('should return Ok status for healthcheck', async () => {
      expect(healthcheckController.healthcheck().status).toBe('Ok');
    });
  });
});
