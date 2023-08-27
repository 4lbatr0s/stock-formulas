/**
 * A builder class for constructing regular expressions.
 */
class RegEasy {
  /**
   * Creates a new RegEasy instance.
   * @param {object} [options] - Configuration options for the builder.
   * @param {string} [options.flags] - Flags to be applied to the built RegExp.
   */
  constructor(options = {}) {
    /**
     * An array to store segments of the regular expression pattern.
     * @type {string[]}
     * @private
     */
    this.segments = [];

    /**
     * Configuration options for the builder.
     * @type {object}
     * @private
     */
    this.options = options;
  }

  /**
   * Adds characters to the regex pattern.
   * @param {string} characters - Characters to include in the pattern.
   * @returns {RegEasy} The current RegEasy instance for chaining.
   */
  includeCharacters(characters) {
    this.segments.push(characters);
    return this;
  }

  /**
   * Adds a range of characters to the regex pattern.
   * @param {string} start - Starting character of the range.
   * @param {string} end - Ending character of the range.
   * @returns {RegEasy} The current RegEasy instance for chaining.
   */
  includeCharacterRange(start, end) {
    this.segments.push(`${start}-${end}`);
    return this;
  }

  /**
   * Excludes characters from the regex pattern.
   * @param {string} characters - Characters to exclude from the pattern.
   * @returns {RegEasy} The current RegEasy instance for chaining.
   */
  excludeCharacters(characters) {
    this.segments.push(`[^${characters}]`);
    return this;
  }

  /**
   * Adds a string to the regex pattern.
   * @param {string} str - The string to include in the pattern.
   * @returns {RegEasy} The current RegEasy instance for chaining.
   */
  includeString(str) {
    this.segments.push(str);
    return this;
  }

  /**
   * Adds a dynamic enclosure to the regex pattern.
   * @param {string} delimiter - The delimiter character to enclose content.
   * @returns {RegEasy} The current RegEasy instance for chaining.
   */
  includeEnclosure(delimiter) {
    const opening = this.escapeString(delimiter.charAt(0));
    const closing = this.escapeString(delimiter.charAt(1));
    this.segments.push(`${opening}(.*?)${closing}`);
    return this;
  }

  /**
   * Set custom flags for the regular expression.
   * @param {string} flags - Flags to be applied to the built RegExp.
   * @returns {RegEasy} The current RegEasy instance for chaining.
   */
  setFlags(flags) {
    this.options.flags = flags;
    return this;
  }

  /**
   * Set custom options for the builder.
   * @param {object} options - Configuration options for the builder.
   * @returns {RegEasy} The current RegEasy instance for chaining.
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
    return this;
  }

  /**
   * Builds the final regular expression.
   * @returns {RegExp} The built regular expression.
   */
  build() {
    const pattern = this.segments
      .map((segment) => this.escapeString(segment))
      .join("");
    const flags = this.options.flags || "";
    return new RegExp(pattern, flags);
  }

  /**
   * Escapes special characters in a string.
   * @param {string} input - The input string to escape.
   * @returns {string} The escaped string.
   * @private
   */
  escapeString(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}

export default new RegEasy();
