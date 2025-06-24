const express = require('express');
const router = express.Router();
const Activity = require('../Model/Activity');
const User =  require('../Model/User');
const LinkQR = require('../Model/LinkQr');

// Recent Activity (latest 5)
router.get('/recent-activity', async (req, res) => {
  try {
    const recent = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent activity' });
  }
});

// State Overview (counts)
router.get('/state-overview', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ user_status: 'active' });
    const inactiveUsers = await User.countDocuments({ user_status: 'inactive' });

    const totalLinks = await LinkQR.countDocuments();
    const recentLinks = await LinkQR.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
      },
      qrCodes: {
        totalGenerated: totalLinks,
        recentLinks
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch state overview' });
  }
});

module.exports = router;
