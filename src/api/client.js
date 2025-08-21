// central API client used by dashboard components
const API_BASE = 'http://localhost:8080';

const j = async (r) => {
  if (!r.ok) {
    const txt = await r.text().catch(()=>null);
    throw new Error(txt || `API error ${r.status}`);
  }
  return r.json().catch(()=>null);
};

const USER_ID = 1; // demo - replace with real user id

export const createJob = (payload) =>
  fetch(`${API_BASE}/jobs/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(j);

export const getJobs = (userId = USER_ID) =>
  fetch(`${API_BASE}/jobs/list/${userId}`).then(j);

export const updateJobStatus = (jobId, status) =>
  fetch(`${API_BASE}/jobs/updateStatus`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ job_id: jobId, status }),
  }).then(j);

// Notifications
export const sendNotification = (customerId, message) =>
  fetch(`${API_BASE}/notifications/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer_id: customerId, message }),
  }).then(j);

export const getNotifications = (userId = USER_ID) =>
  fetch(`${API_BASE}/notifications/list/${userId}`).then(j);

export const markNotificationSeen = (notificationId) =>
  fetch(`${API_BASE}/notifications/markSeen`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notification_id: notificationId }),
  }).then(j);

// Payments
export const getPayments = (userId = USER_ID) =>
  fetch(`${API_BASE}/payments/list/${userId}`).then(j);

export const addPayment = (payload) =>
  fetch(`${API_BASE}/payments/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(j);

// Analytics
export const getAnalytics = () =>
  fetch(`${API_BASE}/analytics/stats`).then(j);
