using System.ComponentModel.DataAnnotations;

namespace _31241025891_NguyenKieuOanh.Validation;

public class CheckDateGreaterThanTodayAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        return value is DateTime date && date >= DateTime.UtcNow
            ? ValidationResult.Success
            : new ValidationResult("Ngày phát hành phải từ thời điểm hiện tại trở đi.");
    }
}
