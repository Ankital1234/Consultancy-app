/**
 * Format number as Indian Rupees (INR)
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 */
export const formatINR = (
  amount: number,
  options?: {
    showDecimals?: boolean;
    compact?: boolean;
  }
): string => {
  const { showDecimals = false, compact = false } = options || {};

  if (compact) {
    // Compact notation for large numbers
    if (amount >= 10000000) {
      // Crores
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    } else if (amount >= 100000) {
      // Lakhs
      return `₹${(amount / 100000).toFixed(2)}L`;
    } else if (amount >= 1000) {
      // Thousands
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
};

/**
 * Format hourly rate in INR
 * @param rate - Hourly rate
 * @returns Formatted rate string with "/hour"
 */
export const formatHourlyRate = (rate: number): string => {
  return `${formatINR(rate)}/hour`;
};

/**
 * Format project budget range in INR
 * @param min - Minimum budget
 * @param max - Maximum budget
 * @returns Formatted budget range string
 */
export const formatBudgetRange = (min: number, max: number): string => {
  return `${formatINR(min)} - ${formatINR(max)}`;
};

/**
 * Parse INR string to number
 * @param inrString - INR formatted string
 * @returns Numeric value
 */
export const parseINR = (inrString: string): number => {
  return parseFloat(inrString.replace(/[₹,]/g, ''));
};

/**
 * Convert USD to INR (approximate rate: 1 USD = 83 INR)
 * @param usdAmount - Amount in USD
 * @param exchangeRate - Exchange rate (default: 83)
 * @returns Amount in INR
 */
export const convertUSDtoINR = (
  usdAmount: number,
  exchangeRate: number = 83
): number => {
  return Math.round(usdAmount * exchangeRate);
};
