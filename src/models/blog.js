const connection = require("../db/conn");

class blog {
  static addCategory(detail) {
    const { category_name, editId } = detail;
    if (editId > 0) {
      // If editId is provided, update the existing category
      return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE blog_category SET category_name = ? WHERE id = ?';
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
        const insertQuery = 'INSERT INTO blog_category(category_name) VALUES (?)';
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
    const selectAllQuery = 'SELECT * FROM blog_category where is_deleted =0';
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
    const selectByIdQuery = 'SELECT * FROM blog_category WHERE id = ?';
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

  static findByBlogId(id) {
    const selectByIdQuery = 'SELECT blogs.id, blogs.image,blogs.title,DATE_FORMAT(blogs.dateOfBlog, "%Y-%m-%d") as dateOfBlog, blogs.description,blogs.category_id FROM blogs WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.query(selectByIdQuery, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null); 
          } else {
            resolve(results[0]); 
          }
        }
      });
    });
  }

  static addNewBlog(detail) {
    const { category_id,title,dateOfBlog,description,image,editId } = detail;
    if (editId > 0) {
      return new Promise((resolve, reject) => {
      let updateQuery, updateParams;
  
      if (image === "") {
        updateQuery = 'UPDATE blogs SET category_id=?, title=?, dateOfBlog=?,description=? WHERE id=?';
        updateParams = [category_id, title,dateOfBlog, description, editId];
      } else {
        updateQuery = 'UPDATE blogs SET category_id=?, title=?, dateOfBlog=?,description=?,image=? WHERE id=?';
        updateParams = [category_id, title,dateOfBlog, description,image, editId];
      }
      connection.query(updateQuery, updateParams, (updateError) => {
        if (updateError) {
          reject(updateError);
        } else {
          resolve({ updated: true, id: editId });
        }
      });
    });

      // If editId is provided, update the existing category
      // return new Promise((resolve, reject) => {
      //   const updateQuery = 'UPDATE blogs SET category_id=? , title= ?,dateOfBlog=?, description=? WHERE id = ?';
      //   connection.query(updateQuery, [category_id,title,dateOfBlog,description,editId ], (updateError) => {
      //     if (updateError) {
      //       reject(updateError);
      //     } else {
      //       resolve({ updated: true, id: editId });
      //     }
      //   });
      // });
    } else {
      // If editId is not provided, insert a new category
      return new Promise((resolve, reject) => {
        const insertQuery = 'INSERT INTO blogs(category_id,title,dateOfBlog,description ,image) VALUES (?,?,?,?,?)';
        connection.query(insertQuery, [category_id,title,dateOfBlog,description,image], (insertError, insertResults) => {
          if (insertError) {
            reject(insertError);
          } else {
            resolve({ inserted: true, id: insertResults.insertId });
          }
        });
      });
    }
  }
  static getBlogList(limit) {
    let limitClause = "";
    if (limit !== "") {
      limitClause = "ORDER BY blogs.id DESC LIMIT " + limit;
    }
    const blogs_list = `SELECT blogs.id, blogs.image,blogs.title,DATE_FORMAT(blogs.dateOfBlog, "%M %d, %Y") as dateOfBlog, blogs.description,blog_category.category_name from blogs INNER JOIN blog_category on blog_category.id = blogs.category_id ${limitClause}`;
    return new Promise((resolve, reject) => {
      connection.query(blogs_list, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}



module.exports = blog;
