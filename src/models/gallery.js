const connection = require("../db/conn");

class gallery {
  static addCategory(detail) {
    const { category_name, editId } = detail;
    console.log(detail);
    if (editId > 0) {
      // If editId is provided, update the existing testimonial
      return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE category SET category_name = ? WHERE id = ?';
        connection.query(updateQuery, [category_name, editId], (updateError) => {
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
        const insertQuery = 'INSERT INTO category(category_name) VALUES (?)';
        console.log(insertQuery);
        connection.query(insertQuery, [category_name], (insertError, insertResults) => {
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

  static findByCategoryId(id) {
    const selectByIdQuery = 'SELECT * FROM category WHERE id = ?';
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

  static getImageGalleryAll() {
    const selectAllQuery = 'SELECT * FROM image_gallery';
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
  static getPujaCategoryAll() {
    const PujaAllCategory =  `SELECT category.id, category.category_name
    FROM category
    INNER JOIN image_gallery ON category.id = image_gallery.category_id
    WHERE category.is_active = 0 AND category.is_deleted = 0
    GROUP BY category.id`;
    return new Promise((resolve, reject) => {
      connection.query(PujaAllCategory, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static getPujaGalleryAll() {
    const pujaimages = `SELECT * from image_gallery`;
    return new Promise((resolve, reject) => {
      connection.query(pujaimages, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

}


module.exports = gallery;
