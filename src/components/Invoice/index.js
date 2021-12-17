import React from "react";
import "./styles.css";

export default function Invoice() {
  return (
    <div class="invoice-container-global">
      <div class="invoice-container">
        <div class="invoice-top">
          <div class="invoice-personal-info">
            <h2>Invoice</h2>
            <div class="input-personal-info-single">
              <input
                type="text"
                width="100%"
                placeholder="Your Company*"
                class="input-title"
              />
              <input
                type="text"
                width="100%"
                placeholder="Your First and Last Name*"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="Company Website*"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="Company Address"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="City, State ZIP"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="Country"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="Phone No*"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="Email Address*"
                class="input-subtitle"
              />
            </div>
            <div class="input-personal-info-single">
              <input
                type="text"
                width="100%"
                placeholder="Client's Company"
                class="input-title"
              />
              <input
                type="text"
                width="100%"
                placeholder="Client's Name"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="Client's Address"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="City, State ZIP"
                class="input-subtitle"
              />
              <input
                type="text"
                width="100%"
                placeholder="Country"
                class="input-subtitle"
              />
            </div>
          </div>
          <div class="logo-date-container">
            <div class="logo-container">
              <input type="file" accept="image/*" class="input-logo" />
              <span class="label-logo-container">
                Drag & drop a logo file or click to upload
              </span>

              {/*<img src="" alt="Comany Logo"/>*/}
            </div>
            <div class="date-no-container">
              <div class="date-container-single">
                <input
                  type="text"
                  width="30%"
                  class="input-invoice-label"
                  value="Invoice No:"
                />
                <input
                  type="text"
                  width="30%"
                  class="input-invoice"
                  placeholder="####"
                />
              </div>
              <div class="date-container-single">
                <input
                  type="text"
                  width="30%"
                  class="input-invoice-label"
                  value="Invoice Date:"
                />
                <input
                  type="text"
                  width="30%"
                  class="input-invoice date"
                  placeholder="11111"
                />
              </div>
              <div class="date-container-single">
                <input
                  type="text"
                  width="30%"
                  class="input-invoice-label"
                  value="Due Date:"
                />
                <input
                  type="text"
                  width="30%"
                  class="input-invoice date"
                  placeholder="11111"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead color="#425B76" class="header-table">
              <th colSpan="1">
                <div class="th-container">
                  <input
                    type="text"
                    width="100%"
                    placeholder="ID"
                    color="#fff"
                    value="ID"
                    class="input-header-table"
                  ></input>
                </div>
              </th>
              <th colSpan="2">
                <div>
                  <input
                    type="text"
                    width="100%"
                    placeholder="Description"
                    color="#fff"
                    value="Description"
                    class="input-header-table"
                  ></input>
                </div>
              </th>
              <th colSpan="3">
                <div>
                  <input
                    type="text"
                    width="100%"
                    placeholder="Quantity"
                    color="#fff"
                    value="Quantity"
                    class="input-header-table"
                  ></input>
                </div>
              </th>
              <th colSpan="4">
                <div>
                  <input
                    type="text"
                    width="100%"
                    placeholder="Price"
                    color="#fff"
                    value="Price"
                    class="input-header-table"
                  ></input>
                </div>
              </th>
            </thead>
            <tbody>
              <td>
                <div>
                  <input
                    type="text"
                    width="100%"
                    placeholder="01"
                    class="input-table"
                  ></input>
                </div>
              </td>
              <td colSpan="2">
                <div>
                  <input
                    type="text"
                    width="100%"
                    placeholder="Item description"
                    class="input-table"
                  ></input>
                </div>
              </td>
              <td colSpan="3">
                <div>
                  <input
                    type="text"
                    width="100%"
                    placeholder="1"
                    class="input-table"
                  ></input>
                </div>
              </td>
              <td colSpan="4">
                <div>
                  <input
                    type="text"
                    width="100%"
                    placeholder="234"
                    class="input-table"
                  ></input>
                </div>
              </td>
            </tbody>
          </table>
        </div>
        <div class="invoice-bottom">
          <div class="comment-double-container">
            <div class="comment-container">
              <span color="#425B76">Notes:</span>
              <textarea placeholder="Any addiotional comments"></textarea>
            </div>
          </div>
          <div class="total-container">
            <div class="total-row-single">
              <input
                type="text"
                width="100%"
                placeholder="Subtotal:"
                value="Subtotal:"
                class="total-input"
              ></input>
              <span>0.00</span>
            </div>
            <div class="total-row-single">
              <input
                type="text"
                width="100%"
                placeholder="Tax:"
                value="Tax:"
                class="total-input"
              ></input>
              <div class="row-porcentaje">
                <input type="text" width="100%" placeholder="0"></input>
                <span>%</span>
              </div>
            </div>
            <div class="total-row-single">
              <input
                type="text"
                width="100%"
                placeholder="Discount:"
                value="Discount:"
                class="total-input"
              ></input>
              <div class="row-porcentaje">
                <input type="text" width="100%" placeholder="0"></input>
                <span>%</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="total-row-single">
              <input
                type="text"
                width="100%"
                placeholder="Total:"
                value="Total:"
                class="total-input"
              ></input>
              <span>0.00</span>
            </div>
          </div>
        </div>
        <div class="end-label-container">
          <p>This invoice was created using the HubSpot</p>
          <a href="https://www.hubspot.com/invoice-template-generator?submitted=true">
            Invoice Template Generation
          </a>
        </div>
      </div>
      <button class="primary-button generate-button">Generate invoice</button>
      {/*<button class="primary-button edit-button">Edit invoice</button>
      <button class="primary-button delete-button">Delete invoice</button>*/}
    </div>
  );
}
