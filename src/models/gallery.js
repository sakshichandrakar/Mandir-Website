const connection = require("../db/conn");

class testimonials {
  static add(detail) {
    const { name, message, editId } = detail;

    if (editId > 0) {
      // If editId is provided, update the existing testimonial
      return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE testimonials SET name = ?, message = ? WHERE id = ?';
        connection.query(updateQuery, [name, message, editId], (updateError) => {
          if (updateError) {
            reject(updateError);
          } else {
            resolve({ updated: true, id: editId });
          }
        });
      });
    } else {
      // If editId is not provided, insert a new testimonial
      return new Promise((resolve, reject) => {
        const insertQuery = 'INSERT INTO testimonials(name, message) VALUES (?, ?)';
        connection.query(insertQuery, [name, message], (insertError, insertResults) => {
          if (insertError) {
            reject(insertError);
          } else {
            resolve({ inserted: true, id: insertResults.insertId });
          }
        });
      });
    }
  }

    
  static getcategoryAll() {
    const selectAllQuery = 'SELECT * FROM category';
    return new Promise((resolve, reject) => {
      connection.query(selectAllQuery, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static findById(id) {
    const selectByIdQuery = 'SELECT * FROM testimonials WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.query(selectByIdQuery, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // If no testimonial found with the given ID
          } else {
            resolve(results[0]); // Assuming ID is unique, return the first result
          }
        }
      });
    });
  }
  static getImageCategory(){
    const selectImageQuery = ' SELECT category.id, category.category_name FROM category INNER JOIN image_gallery ON category.id = image_gallery.category_id WHERE category.is_active = 0 AND category.is_deleted = 0 GROUP BY category.id';
    return new Promise((resolve, reject) => {
      connection.query(selectImageQuery, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static getImageGallries(){
    const imageGalleryQuery = 'SELECT * FROM image_gallery';
    return new Promise((resolve, reject) => {
      connection.query(imageGalleryQuery, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}


module.exports = testimonials;
