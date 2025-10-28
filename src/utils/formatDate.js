/**
 * Formats a date string into a minimal, user-friendly time display
 * @param {string|Date} dateString - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) {
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // For posts less than a minute old, show time
    if (seconds < 60) {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    // For posts less than an hour old, show minutes
    if (minutes < 60) {
      return `${minutes}m`;
    }

    // For posts less than 24 hours old, show hours
    if (hours < 24) {
      return `${hours}h`;
    }

    // For posts less than 7 days old, show days
    if (days < 7) {
      return `${days}d`;
    }

    // For older posts, show date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    // Fallback to current time if date parsing fails
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}

/**
 * Formats a date string into a full datetime display
 * @param {string|Date} dateString - The date to format
 * @returns {string} Formatted datetime string
 */
export function formatDateTime(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    return '';
  }
}
