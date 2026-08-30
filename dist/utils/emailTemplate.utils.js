"use strict";
//* Send Account Created Email
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactEmailHtml = exports.LoginDetectedEmailHtml = exports.AccountCreatedEmailHtml = void 0;
const AccountCreatedEmailHtml = (user) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Created</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:10px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td align="center"
            style="background:#000000;color:#ffffff;padding:30px;">

            <h1 style="margin:0;font-size:28px;">
                Account Created Successfully
            </h1>

        </td>
    </tr>

    <!-- Body -->
    <tr>
        <td style="padding:40px;">

            <h2 style="margin-top:0;color:#000;">
                Hello, ${user.full_name} 👋
            </h2>

            <p style="font-size:16px;color:#555;line-height:1.8;">
                Welcome! Your account has been successfully created.
                You can now log in and enjoy all the features of our platform.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0"
            style="border-collapse:collapse;margin-top:25px;">

                <tr>
                    <td style="padding:12px;border:1px solid #ddd;font-weight:bold;width:180px;">
                        Full Name
                    </td>

                    <td style="padding:12px;border:1px solid #ddd;">
                        ${user.full_name}
                    </td>
                </tr>

                <tr>
                    <td style="padding:12px;border:1px solid #ddd;font-weight:bold;">
                        Email Address
                    </td>

                    <td style="padding:12px;border:1px solid #ddd;">
                        ${user.email}
                    </td>
                </tr>

                <tr>
                    <td style="padding:12px;border:1px solid #ddd;font-weight:bold;">
                        Account Created
                    </td>

                    <td style="padding:12px;border:1px solid #ddd;">
                        ${new Date(user.createdAt).getFullYear()}
                        ${new Date(user.createdAt).toLocaleString("en-US", {
        month: "long",
    })}
                        ${new Date(user.createdAt).getDate()}
                        |
                        ${new Date(user.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })}
                    </td>
                </tr>

            </table>

            <div style="text-align:center;margin-top:35px;">

                <a href="http://localhost:5173/login"
                style="
                    display:inline-block;
                    background:#000000;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 35px;
                    border-radius:6px;
                    font-size:16px;
                    font-weight:bold;
                ">
                    Login to Your Account
                </a>

            </div>

            <p style="margin-top:40px;color:#666;font-size:15px;line-height:1.7;">
                If you did not create this account, please contact our support team immediately.
            </p>

            <p style="margin-top:30px;color:#000;">
                Regards,<br>
                <strong>School Management System Team</strong>
            </p>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td align="center"
            style="background:#000000;color:#ffffff;padding:20px;font-size:13px;">

            © ${new Date().getFullYear()} School Management System <br>
            All Rights Reserved.

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};
exports.AccountCreatedEmailHtml = AccountCreatedEmailHtml;
//* Login Detected Email
const LoginDetectedEmailHtml = (user) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login Detected</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:10px;overflow:hidden;">

<!-- Header -->
<tr>
<td align="center"
style="background:#000000;color:#ffffff;padding:30px;">

<h1 style="margin:0;font-size:28px;">
🔐 Login Detected
</h1>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#000;">
Hello, ${user.full_name}
</h2>

<p style="font-size:16px;color:#555;line-height:1.8;">
We detected a successful login to your account.
If this was you, no further action is required.
</p>

<table width="100%" cellpadding="0" cellspacing="0"
style="border-collapse:collapse;margin-top:25px;">

<tr>
<td style="padding:12px;border:1px solid #ddd;font-weight:bold;width:180px;">
Full Name
</td>

<td style="padding:12px;border:1px solid #ddd;">
${user.full_name}
</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #ddd;font-weight:bold;">
Login Time
</td>

<td style="padding:12px;border:1px solid #ddd;">
${new Date(user.loginAt).getFullYear()}
${new Date(user.loginAt).toLocaleString("en-US", { month: "long" })}
${new Date(user.loginAt).getDate()}
|
${new Date(user.loginAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    })}
</td>
</tr>



</table>

<div style="text-align:center;margin-top:35px;">

<a href="http://localhost:5173/login"
style="
display:inline-block;
background:#000000;
color:#ffffff;
text-decoration:none;
padding:14px 35px;
border-radius:6px;
font-size:16px;
font-weight:bold;
">

Open My Account

</a>

</div>

<p style="margin-top:35px;color:#d32f2f;font-size:15px;line-height:1.7;font-weight:bold;">
If you do not recognize this login, change your password immediately and contact support.
</p>

<p style="margin-top:30px;color:#000;">
Regards,<br>
<strong>School Management System Team</strong>
</p>

</td>
</tr>

<!-- Footer -->

<tr>
<td align="center"
style="background:#000000;color:#ffffff;padding:20px;font-size:13px;">

© ${new Date().getFullYear()} School Management System<br>
All Rights Reserved.

</td>
</tr>

</table>

</td>
</tr>

</table>

</body>

</html>
`;
};
exports.LoginDetectedEmailHtml = LoginDetectedEmailHtml;
const ContactEmailHtml = (value) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact Message</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:10px;overflow:hidden;">

<!-- Header -->
<tr>
<td align="center"
style="background:#000000;color:#ffffff;padding:30px;">

<h1 style="margin:0;font-size:28px;">
📩 New Contact Message
</h1>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#000;">
Hello Admin,
</h2>

<p style="font-size:16px;color:#555;line-height:1.8;">
You have received a new message from the contact form on
<strong>Nepali Store</strong>.
</p>

<!-- Contact Details -->
<table width="100%" cellpadding="0" cellspacing="0"
style="border-collapse:collapse;margin-top:25px;">

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
width:180px;
">
Name
</td>

<td style="
padding:12px;
border:1px solid #ddd;
">
${value.name}
</td>

</tr>

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
">
Email
</td>

<td style="
padding:12px;
border:1px solid #ddd;
">
${value.email}
</td>

</tr>

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
">
Subject
</td>

<td style="
padding:12px;
border:1px solid #ddd;
">
${value.subject}
</td>

</tr>

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
vertical-align:top;
">
Message
</td>

<td style="
padding:12px;
border:1px solid #ddd;
line-height:1.6;
">
${value.message}
</td>

</tr>

</table>

<!-- Button -->
<div style="text-align:center;margin-top:35px;">

<a href="mailto:${value.email}"
style="
display:inline-block;
background:#000000;
color:#ffffff;
text-decoration:none;
padding:14px 35px;
border-radius:6px;
font-size:16px;
font-weight:bold;
">

Reply to Customer

</a>

</div>

<p style="
margin-top:35px;
color:#555;
font-size:15px;
line-height:1.7;
">

Please review the customer's message and respond as soon as possible.

</p>

<p style="margin-top:30px;color:#000;">

Regards,<br>

<strong>Nepali Store Team</strong>

</p>

</td>
</tr>

<!-- Footer -->

<tr>

<td align="center"
style="
background:#000000;
color:#ffffff;
padding:20px;
font-size:13px;
">

© ${new Date().getFullYear()} Nepali Store<br>

All Rights Reserved.

</td>

</tr>

</table>

</td>
</tr>

</table>

</body>

</html>
`;
};
exports.ContactEmailHtml = ContactEmailHtml;
