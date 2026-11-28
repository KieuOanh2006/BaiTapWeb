using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using _31241025891_NguyenKieuOanh.Validation;

namespace _31241025891_NguyenKieuOanh.Models;

public class Movie
{
    public int ID { get; set; }

    [Display(Name = "Tiêu đề")]
    [Required]
    [StringLength(200, MinimumLength = 3)]
    public string Title { get; set; }

    [Display(Name = "Tóm tắt")]
    [MinLength(3)]
    public string Summary { get; set; }

    [Display(Name = "Ngày phát hành")]
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    [CheckDateGreaterThanToday]
    public DateTime ReleaseDate { get; set; }

    [Display(Name = "Thể loại")]
    [StringLength(10)]
    [Genre]
    public string Genre { get; set; }

    public int? GenreID { get; set; }

    [ForeignKey(nameof(GenreID))]
    public Genre GenreObj { get; set; }

    [Display(Name = "Giá")]
    [Column(TypeName = "decimal(18,2)")]
    [Range(typeof(decimal), "5000", "9999999999999999.99", ParseLimitsInInvariantCulture = true)]
    [DisplayFormat(DataFormatString = "{0:0,000}")]
    public decimal Price { get; set; }

    [Display(Name = "Xếp hạng")]
    [Range(1d, 5d)]
    public double Rated { get; set; }

    [Display(Name = "Hình ảnh")]
    public string PicturePath { get; set; }

    [Display(Name = "Hình ảnh")]
    [NotMapped]
    public IFormFile PictureUpload { get; set; }
}
