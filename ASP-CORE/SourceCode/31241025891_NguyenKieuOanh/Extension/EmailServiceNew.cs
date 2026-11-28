using System.Net;
using System.Net.Mail;
using System.Text;

namespace _31241025891_NguyenKieuOanh.Extension;

public class EmailServiceNew
{
    /// <summary>
    /// Gửi email sử dụng máy chủ SMTP Google (smtp.gmail.com).
    /// </summary>
    public static async Task<bool> SendMailGoogleSmtp(string from, string to, string subject,
        string body, string gmailAddress, string gmailPassword)
    {
        if (string.IsNullOrWhiteSpace(gmailAddress) || string.IsNullOrWhiteSpace(gmailPassword))
        {
            return false;
        }

        using var client = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential(gmailAddress, gmailPassword),
            EnableSsl = true
        };
        return await SendMail(from, to, subject, body, client);
    }

    /// <summary>
    /// Gửi email qua một SmtpClient đã cấu hình.
    /// </summary>
    public static async Task<bool> SendMail(string from, string to, string subject,
        string body, SmtpClient client)
    {
        try
        {
            using var message = new MailMessage(from, to, subject, body)
            {
                BodyEncoding = Encoding.UTF8,
                SubjectEncoding = Encoding.UTF8,
                IsBodyHtml = true
            };
            message.ReplyToList.Add(new MailAddress(from));
            message.Sender = new MailAddress(from);

            await client.SendMailAsync(message);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Không gửi được email xác nhận ({ex.GetType().Name}).");
            return false;
        }
    }
}
