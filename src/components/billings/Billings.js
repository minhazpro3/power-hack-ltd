import React from "react";

const Billings = () => {
  return (
    <div>
      <div class="container">
        <h2>Bordered Table</h2>
        <p>The .table-bordered class adds borders to a table:</p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            <tr>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
            </tr>
            <tr>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billings;
