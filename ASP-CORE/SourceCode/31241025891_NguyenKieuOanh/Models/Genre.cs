using System.ComponentModel.DataAnnotations;

namespace _31241025891_NguyenKieuOanh.Models;

public class Genre
{
    [Key]
    public int ID { get; set; }

    [Required]
    [StringLength(200)]
    public string Name { get; set; }

    public IList<Movie> Movies { get; set; } = new List<Movie>();
}
