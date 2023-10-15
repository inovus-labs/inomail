# InoMail

![GitHub license](https://img.shields.io/github/license/inovus-labs/inomail) ![GitHub repo size](https://img.shields.io/github/repo-size/inovus-labs/inomail) ![GitHub issues](https://img.shields.io/github/issues/inovus-labs/inomail)
![GitHub last commit](https://img.shields.io/github/last-commit/inovus-labs/inomail) ![GitHub top language](https://img.shields.io/github/languages/top/inovus-labs/inomail) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/inovus-labs/inomail)


**InoMail** is a simple [Node.js](https://nodejs.org/en) project that allows you to send out personalized, unique emails with multiple unique and/or common file attachments. It's a versatile tool for automating email communications, suitable for various use cases such as newsletters, marketing campaigns, personalized notifications or post-event follow-ups.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage) 
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Personalized emails** : Customize the content of each email based on recipient data.
- **Multiple attachments** : Attach one or more unique or common files to each email.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/inovus-labs/inomail.git
   cd inomail
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory and add the following environment variables:

   ```bash
   EMAIL_USER = <your_email_address>
   EMAIL_PASS = <your_email_app_password>
   PORT = 5000
   ```

## Usage

1. **Populate the recipient data:** Prepare a CSV or XLSX file containing recipient information, such as `full_name` , `email_address` and any custom fields required for email customization.

   > The first row of the file should contain the column names. The column names will be used as placeholders in the email templates.
   
   > For example, if you have a column named `full_name` , you can use the placeholder `{full_name}` in your email templates to include the recipient's full name in the email content.

   > Save the file in the project's `public` folder as `email_list.xlsx` .

2. **Add attachments:** For both unique and common attachments, specify the file names in your recipient data (e.g., a column in your XLSX file). Place the files in the project's designated attachments folder.

   > Column names should match the subfolder names in the attachments folder (e.g., if you have a column named `asset_1` , the corresponding file should be placed in the `asset_1` subfolder).
   
   > Common assets are treated as unique assets for each recipient. If you want to include the same file in all emails, add a column named `common_asset` to your recipient data and place the file in the `common_asset` subfolder.

3. **Customize email templates:** Create HTML email templates in the project's `public` folder. Use placeholders to include recipient-specific information. Save the template as `email_content.hbs`.

4. Run the project:

   ```bash
   npm start
   ```

5. The terminal start prompting the results of the email sending process.

## Contributing

If you'd like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE).


## Contact

- For issues or feature requests, please open an issue on the [GitHub repository](https://github.com/inovus-labs/inomail/issues).
- For questions or discussions, you can reach out to [mail@arjunkrishna.in](mailto:mail@arjunkrishna.in).

---

Feel free to customize this README to match your project's specifics. Providing clear instructions and documentation can help both you and potential users or collaborators understand and use your project effectively.