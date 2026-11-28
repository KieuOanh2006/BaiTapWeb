using System.ComponentModel.DataAnnotations;
using _31241025891_NguyenKieuOanh.Data;
using Microsoft.Extensions.DependencyInjection;

namespace _31241025891_NguyenKieuOanh.Validation;

public class GenreAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is not string genre || string.IsNullOrWhiteSpace(genre))
        {
            return new ValidationResult("Vui lòng nhập mã thể loại.");
        }

        if (!int.TryParse(genre, out var genreId))
        {
            return new ValidationResult("Mã thể loại phải là số nguyên.");
        }

        var context = validationContext.GetRequiredService<ApplicationDbContext>();
        return context.Genres.Any(item => item.ID == genreId)
            ? ValidationResult.Success
            : new ValidationResult("Mã thể loại không tồn tại.");
    }
}
