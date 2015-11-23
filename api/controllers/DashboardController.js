/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `DashboardController.domainAvailable()`
   */
  domainAvailable: function (req, res) {
    res.view();
  },


  /**
   * `DashboardController.domainTaken()`
   */
  domainExpiring: function (req, res) {
    res.view();
  }
};

