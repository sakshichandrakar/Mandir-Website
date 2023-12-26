const connection = require("../db/conn");

class WebDetail {
  static create(detail) {
    const { email, mobile_no, instagram_link, twitter_link, facebook_link, youtube_link, address } = detail;
    const selectQuery = 'SELECT id FROM web_details';
    const insertQuery = 'INSERT INTO web_details(email, mobile_no, instagram_link, twitter_link, facebook_link, youtube_link, address) VALUES (?,?,?,?,?,?,?)';
    const updateQuery = 'UPDATE web_details SET email=?, mobile_no=?, instagram_link=?, twitter_link=?, facebook_link=?, youtube_link=?, address=?';

    return new Promise((resolve, reject) => {
      connection.query(selectQuery, (selectError, selectResults) => {
        if (selectError) {
          reject(selectError);
        } else {
          if (selectResults.length > 0) {
            connection.query(updateQuery, [email,mobile_no, instagram_link, twitter_link, facebook_link, youtube_link, address, selectResults[0].id], (updateError) => {
              if (updateError) {
                reject(updateError);
              } else {
                resolve({ inserted: false, id: selectResults[0].id });
              }
            });
          } else {
            connection.query(insertQuery, [email, mobile_no, instagram_link, twitter_link, facebook_link, youtube_link, address], (insertError, insertResults) => {
              if (insertError) {
                reject(insertError);
              } else {
                resolve({ inserted: true, id: insertResults.insertId });
              }
            });
          }
        }
      });
    });
  }
  static getAll() {
    const selectAllQuery = 'SELECT * FROM web_details';
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
}

module.exports = WebDetail;
