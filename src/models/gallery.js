const connection = require("../db/conn");

class gallery {
  static addCategory(detail) {
    const { category_name, editId } = detail;
    if (editId > 0) {
      // If editId is provided, update the existing category
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
      // If editId is not provided, insert a new category
      return new Promise((resolve, reject) => {
        const insertQuery = 'INSERT INTO category(category_name) VALUES (?)';
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

  static getCategoryAll() {
    const selectAllQuery = 'SELECT * FROM category where is_deleted =0';
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
            resolve(null); // If no category found with the given ID
          } else {
            resolve(results[0]); // Assuming ID is unique, return the first result
          }
        }
      });
    });
  }

  static getImageGalleryAll() {
    const selectAllQuery = 'SELECT image_gallery.id, image_gallery.title,image_gallery.image, image_gallery.description, category.id AS category_id, category.category_name FROM image_gallery LEFT JOIN category ON image_gallery.category_id = category.id;';
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
    const PujaAllCategory = `SELECT category.id, category.category_name
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

  static getPujaGalleryAll(limit) {
    let limitClause = "";
    if (limit !== "") {
      limitClause = "ORDER BY image_gallery.id DESC LIMIT " + limit;
    }
  
    const pujaimages = `SELECT image_gallery.id as id,image_gallery.title,image_gallery.description,image_gallery.image,image_gallery.category_id,category.category_name from image_gallery INNER JOIN category on category.id = image_gallery.category_id ${limitClause}`;
    console.log(pujaimages);
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

  static addImageGallery(detail) {
    const { title, description, image, category_id, editId } = detail;
  
    if (editId > 0) {
      return new Promise((resolve, reject) => {
        let updateQuery, updateParams;
  
        if (image === "") {
          updateQuery = 'UPDATE image_gallery SET title=?, description=?, category_id=? WHERE id=?';
          updateParams = [title, description, category_id, editId];
        } else {
          updateQuery = 'UPDATE image_gallery SET title=?, description=?, image=?, category_id=? WHERE id=?';
          updateParams = [title, description, image, category_id, editId];
        }
  
        connection.query(updateQuery, updateParams, (updateError) => {
          if (updateError) {
            reject(updateError);
          } else {
            resolve({ updated: true, id: editId });
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        const insertQuery = 'INSERT INTO image_gallery(title, description, image, category_id) VALUES (?,?,?,?)';
        connection.query(insertQuery, [title, description, image, category_id], (insertError, insertResults) => {
          if (insertError) {
            reject(insertError);
          } else {
            resolve({ inserted: true, id: insertResults.insertId });
          }
        });
      });
    }
  }
  

  static findByImageGalleryId(id) {
    const selectByIdQuery = 'SELECT * FROM image_gallery WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.query(selectByIdQuery, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); // If no category found with the given ID
          } else {
            resolve(results[0]); // Assuming ID is unique, return the first result
          }
        }
      });
    });
  }

}


module.exports = gallery;
