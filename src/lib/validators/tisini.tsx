class TisiniValidator {
    // public static readonly phoneRegex: RegExp = new RegExp(/^(?:07|01)\d{8}$/, "gm");
      // public static readonly phoneRegex: RegExp = new RegExp(/^\+254(7|1)\d{8}$/, "gm");
      public static readonly phoneRegex: RegExp = new RegExp(/^0(7|1)\d{8}$/, "gm");
      public static readonly specialCharacters = new RegExp(
        /[\!\"\#\$\%\&\'\(\)\*\+\,\-\./\:;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]/,
        "gm"
      );
      /**
       *
       * @param phone string
       * @returns boolean
       * Validation for phone number matching `9` digits starting with `1` or `7`
       * This is `Kenya's` phone number format
       */
      static validPhone(phone: string): boolean {
        return TisiniValidator.phoneRegex.test(phone);
      }
      /**
       *
       * @param password string
       * @returns
       * Validation for password matching lowercase characters
       */
      static passwordLowercase(password: string): boolean {
        return /[a-z]/.test(password);
      }
      /**
       * @param password string
       * @returns
       * Validation for password matching uppercase characters
       */
      static passwordUppercase(password: string): boolean {
        return /[A-Z]/.test(password);
      }
      /**
       * @param password string
       * @returns
       * Validation for password matching numbers
       */
      static passwordNumbers(password: string): boolean {
        return /\d/.test(password);
      }
      /**
       * @param password string
       * @returns
       * Validation for password matching special characters
       */
      static passwordSpecialCharacters(password: string): boolean {
        // list of special characters
    
        // return /[!@#$%^&*()]/.test(password);
        return TisiniValidator.specialCharacters.test(password);
      }
      /**
       * @param password string
       * @returns
       * Validation for password matching 8 characters
       */
      static passwordEightCharacters(password: string): boolean {
        return /.{8,}/.test(password);
      }
      /**
       * @param password string
       * @returns
       * Validation for password matching 32 characters
       * This is the maximum length for a password
       * in `AuriginAfrica`
       */
      static passwordThirtyTwoCharacters(password: string): boolean {
        return /.{,32}/.test(password);
      }
      /**
       * @param password string
       * @returns
       * Validation for password matching all the above
       * password validation methods
       * 1. At least 1 uppercase letter
       * 2. At least 1 lowercase letter
       * 3. At least 1 number
       * 4. At least 1 special character
       * 5. At least 8 characters long
       * 6. At most 32 characters long
       * 
       */
      static validPassword(password: string): boolean {
        return (
          this.passwordLowercase(password) &&
          this.passwordUppercase(password) &&
          this.passwordNumbers(password) &&
          this.passwordSpecialCharacters(password) &&
          this.passwordEightCharacters(password) &&
          this.passwordThirtyTwoCharacters(password)
        );
      }
    }
    
    export default TisiniValidator;
    export { TisiniValidator };