/**
 * Working Hours Middleware
 * Checks if the current request is made during working hours (Monday-Friday, 9-17)
 * If outside working hours, redirects to a special page
 */

function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours(); // 0-23

  // Check if it's Monday to Friday (1-5) and between 9-17 hours
  const isWorkingDay = day >= 1 && day <= 5;
  const isWorkingHour = hour >= 9 && hour < 17;

  if (isWorkingDay && isWorkingHour) {
    // During working hours, continue to the next middleware/route
    next();
  } else {
    // Outside working hours, redirect to special page
    res.render('outside-hours', { 
      title: 'Outside Working Hours',
      currentTime: now.toLocaleString(),
      workingHours: 'Monday to Friday, 9:00 AM to 5:00 PM'
    });
  }
}

module.exports = checkWorkingHours;
