// API client for backend communication
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(username, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    this.setToken(data.token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  }

  logout() {
    this.setToken(null);
  }

  // Startup endpoints
  async getStartups(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/startups?${params}`);
  }

  async getStartup(id) {
    return this.request(`/startups/${id}`);
  }

  async createStartup(data) {
    return this.request('/startups', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateStartup(id, data) {
    return this.request(`/startups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteStartup(id) {
    return this.request(`/startups/${id}`, {
      method: 'DELETE'
    });
  }

  async addPitchHistory(id, pitch) {
    return this.request(`/startups/${id}/pitch`, {
      method: 'POST',
      body: JSON.stringify(pitch)
    });
  }

  async uploadDocument(id, file) {
    const formData = new FormData();
    formData.append('document', file);

    return this.request(`/startups/${id}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: formData
    });
  }

  async getStartupStats() {
    return this.request('/startups/stats/overview');
  }

  // SMC endpoints
  async getSMCSchedules(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/smc?${params}`);
  }

  async createSMCSchedule(data) {
    return this.request('/smc', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async completeSMCSchedule(id, data) {
    return this.request(`/smc/${id}/complete`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteSMCSchedule(id) {
    return this.request(`/smc/${id}`, {
      method: 'DELETE'
    });
  }

  // One-on-One endpoints
  async getOneOnOneSessions(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/one-on-one?${params}`);
  }

  async createOneOnOneSession(data) {
    return this.request('/one-on-one', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async completeOneOnOneSession(id, data) {
    return this.request(`/one-on-one/${id}/complete`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteOneOnOneSession(id) {
    return this.request(`/one-on-one/${id}`, {
      method: 'DELETE'
    });
  }

  // Guest endpoints
  async getGuests() {
    return this.request('/guests');
  }

  async createGuest(data) {
    return this.request('/guests', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateGuest(id, data) {
    return this.request(`/guests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteGuest(id) {
    return this.request(`/guests/${id}`, {
      method: 'DELETE'
    });
  }

  // Settings endpoints
  async getSettings() {
    return this.request('/settings');
  }

  async getSetting(key) {
    return this.request(`/settings/${key}`);
  }

  async updateSetting(key, value, description) {
    return this.request(`/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value, description })
    });
  }

  // Landing page endpoints
  async getLandingPage() {
    return this.request('/landing-page');
  }

  async updateLandingPage(data) {
    return this.request('/landing-page', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Achievement endpoints
  async addAchievement(startupId, achievement) {
    return this.request(`/achievements/${startupId}`, {
      method: 'POST',
      body: JSON.stringify(achievement)
    });
  }

  async deleteAchievement(startupId, achievementId) {
    return this.request(`/achievements/${startupId}/${achievementId}`, {
      method: 'DELETE'
    });
  }
}

export const api = new ApiClient();
