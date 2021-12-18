import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";

import Header from "../Header/index";

const Invoice = () => {
  //API
  const api = require("../../config/api.json");

  //Variables por parámetro
  const { id } = useParams();

  //Variable para cambiar de pantalla
  //const navigate = useNavigate();

  //Variables para tabla userCompany - User
  const [userCompany, setUserCompany] = useState("");
  const [userName, setUserName] = useState("");
  const [website, setWebsite] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("");
  const [usercountry, setUserCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [user_id, setUserId] = useState("");

  //Variables para tabla userCompany - Client
  const [clientCompany, setClientCompany] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [client_id, setClientId] = useState("");

  //Variables para items
  const [idItem, setIdItem] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [item_id, setItemId] = useState("");

  //Variables para data invoice
  const [number, setNumber] = useState("");
  const [dateInvoice, setDateInvoice] = useState(
    new Date().getMonth() +
      1 +
      "/" +
      new Date().getDate() +
      "/" +
      new Date().getFullYear()
  );
  const [dateDue, setDateDue] = useState(
    new Date().getMonth() +
      1 +
      "/" +
      new Date().getDate() +
      "/" +
      new Date().getFullYear()
  );

  //Variables para comments
  const [comment, setComment] = useState("");

  //Variables para totales
  const [subtotal, setSubtotal] = useState("0.0");
  const [tax, setTax] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [total, setTotal] = useState("0.0");

  //Obtener data de invoice generada
  useEffect(() => {
    if (id) {
      async function getInvoice() {
        let api = require("../../config/api.json");
        fetch(api.endpoint + "/api/invoice/id/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_invoice: id,
          }),
        })
          .then((response) => response.json())
          .then(async (responseJson) => {
            if (!responseJson.error) {
              console.log(responseJson);
              //Datos de usuario
              setUserId(responseJson.user_id._id);
              setUserCompany(responseJson.user_id.nameCompany);
              setUserName(responseJson.user_id.name);
              setWebsite(responseJson.user_id.website);
              setUserAddress(responseJson.user_id.address);
              setUserCity(responseJson.user_id.city);
              setUserCountry(responseJson.user_id.country);
              setPhone(responseJson.user_id.phone);
              setEmail(responseJson.user_id.email);
              //Datos de cliente
              if (responseJson.client_id) {
                setClientId(responseJson.client_id._id);
                setClientCompany(responseJson.client_id.nameCompany);
                setClientName(responseJson.client_id.name);
                setClientAddress(responseJson.client_id.address);
                setClientCity(responseJson.client_id.city);
                setClientCountry(responseJson.client_id.country);
              }
              //Datos de items
              if (responseJson.id_item) {
                if (responseJson.id_item[0]) {
                  setItemId(responseJson.id_item[0]);
                  getItem(responseJson.id_item[0]);
                }
              }
              //Datos de invoice
              setNumber(responseJson.number);
              setDateInvoice(responseJson.date_invoice);
              setDateDue(responseJson.date_due);
              setComment(responseJson.comment);
              setSubtotal(responseJson.subtotal);
              setTax(responseJson.tax);
              setDiscount(responseJson.discount);
              setTotal(responseJson.total);
            } else {
              console.log("Hubo un error la consulta.");
              console.error(responseJson.error);
            }
          })
          .catch((error) => {
            console.log("Hubo un error la consulta.");
            console.error(error);
          });
      }
      getInvoice();
    }
  }, []);

  //Función para obtener los datos del item
  async function getItem(id) {
    await fetch(api.endpoint + "/api/item/id", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_item: id,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (!responseJson.error) {
          setIdItem(responseJson.id_item);
          setDescription(responseJson.description);
          setQuantity(responseJson.quantity);
          setPrice(responseJson.price);
        } else {
          console.log("Hubo un error la consulta.");
          console.error(responseJson.error);
        }
      })
      .catch((error) => {
        console.log("Hubo un error la consulta.");
        console.error(error);
      });
  }

  //Funcion para guardar usuario
  async function uploadUserCompany(value) {
    let data = {};
    //Evaluar si es user's company o client's company
    if (value === 0) {
      data = {
        nameCompany: userCompany,
        name: userName,
        website,
        address: userAddress,
        city: userCity,
        country: usercountry,
        phone,
        email,
        type: 0,
      };
    } else {
      data = {
        nameCompany: clientCompany,
        name: clientName,
        address: clientAddress,
        city: clientCity,
        country: clientCountry,
        type: 1,
      };
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(api.endpoint + "/api/user/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (!responseJson.error) {
              resolve(responseJson._id);
            } else {
              console.log("Hubo un error la consulta.");
              console.error(responseJson.error);
            }
          })
          .catch((error) => {
            console.log("Hubo un error la consulta.");
            console.error(error);
          });
      }, 100);
    });
  }
  //Función para guardar item
  async function uploadItem() {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(api.endpoint + "/api/item/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_item: idItem,
            description,
            quantity,
            price,
          }),
        })
          .then((response) => response.json())
          .then(async (responseJson) => {
            if (!responseJson.error) {
              setItemId(responseJson._id);
              resolve(responseJson._id);
            } else {
              console.log("Hubo un error la consulta.");
              console.error(responseJson.error);
            }
          })
          .catch((error) => {
            console.log("Hubo un error la consulta.");
            console.error(error);
          });
      }, 100);
    });
  }
  //Función para guardar invoice completa
  async function uploadInvoiceComplete(id_user, id_client, id_item) {
    await fetch(api.endpoint + "/api/invoice/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id_user,
        client_id: id_client,
        img: "",
        number,
        date_invoice: dateInvoice,
        date_due: dateDue,
        id_item,
        comment,
        subtotal,
        tax,
        discount,
        total,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (!responseJson.error) {
          console.log(responseJson);
          //Recargar página con id de invoice
          window.open(`https://lit-forest-43463.herokuapp.com/#/invoice/${responseJson._id}`);
          //navigate(`/${responseJson._id}`);
          window.location.reload();
        } else {
          console.log("Hubo un error la consulta.");
          console.error(responseJson.error);
        }
      })
      .catch((error) => {
        console.log("Hubo un error la consulta.");
        console.error(error);
      });
  }
  //Función para actualizar subtotal
  const updateSubtotal = (quantity, price) => {
    setQuantity(quantity);
    setPrice(price);
    if (!isNaN(quantity) && !isNaN(price)) {
      setSubtotal(quantity * price);
      setTotal(quantity * price);
    }
  };
  //Función para actualizar total
  const updateTotal = (subtotal, tax, discount) => {
    setTax(tax);
    setDiscount(discount);
    if (tax !== 0 && discount !== 0) {
      setTotal((subtotal + subtotal * (tax / 100)) * (1 - discount / 100));
    } else if (tax !== 0) {
      setTotal(subtotal + subtotal * (tax / 100));
    } else {
      setTotal(subtotal);
    }
  };

  //Función que valida formulario y envia a funciones con fetch para guardar invoice
  const uploadInvoice = async () => {
    if (userCompany && userName && website && phone && email) {
      const strongRegex = new RegExp(
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      );
      if (!isNaN(phone) && strongRegex.test(email)) {
        const id_user = await uploadUserCompany(0);
        //Validar que haya datos de cliente
        if (
          clientCompany ||
          clientName ||
          clientAddress ||
          clientCity ||
          clientCountry
        ) {
          const id_client = await uploadUserCompany(1);
          //Validar que haya item
          if (idItem || description || quantity || price) {
            const id_item = await uploadItem();
            await uploadInvoiceComplete(id_user, id_client, id_item);
          } else {
            await uploadInvoiceComplete(id_user, id_client, null);
          }
        } else {
          //Validar que haya item
          if (idItem || description || quantity || price) {
            const id_item = await uploadItem();
            await uploadInvoiceComplete(id_user, null, id_item);
          } else {
            await uploadInvoiceComplete(id_user, null, null);
          }
        }
      }
    }
  };
  //Función para eliminar invoice junto con item y companies  relacionadas
  async function deleteInvoice() {
    fetch(api.endpoint + "/api/invoice/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_invoice: id,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (!responseJson.error) {
          window.open(`https://lit-forest-43463.herokuapp.com/#/`);
          window.location.reload();
        } else {
          console.log("Hubo un error la consulta.");
          console.error(responseJson.error);
        }
      })
      .catch((error) => {
        console.log("Hubo un error la consulta.");
        console.error(error);
      });
  }
  //Función para actualizar user's company y clien't company
  async function updateUserCompany(value) {
    let data = {};
    if (value === 0) {
      data = {
        id_user: user_id,
        nameCompany: userCompany,
        name: userName,
        website,
        address: userAddress,
        city: userCity,
        country: usercountry,
        phone,
        email,
        type: 0,
      };
    } else {
      data = {
        id_user: client_id,
        nameCompany: clientCompany,
        name: clientName,
        address: clientAddress,
        city: clientCity,
        country: clientCountry,
        type: 1,
      };
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(api.endpoint + "/api/user/", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(async (responseJson) => {
            if (!responseJson.error) {
              resolve(responseJson._id);
            } else {
              console.log("Hubo un error la consulta.");
              console.error(responseJson.error);
            }
          })
          .catch((error) => {
            console.log("Hubo un error la consulta.");
            console.error(error);
          });
      }, 100);
    });
  }
  //Función para actualizar item
  async function updateItem() {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(api.endpoint + "/api/item/", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item_id,
            id_item: idItem,
            description,
            quantity,
            price,
          }),
        })
          .then((response) => response.json())
          .then(async (responseJson) => {
            if (!responseJson.error) {
              resolve(responseJson._id);
            } else {
              console.log("Hubo un error la consulta.");
              console.error(responseJson.error);
            }
          })
          .catch((error) => {
            console.log("Hubo un error la consulta.");
            console.error(error);
          });
      }, 100);
    });
  }
  //Función para actualizar invoice completa
  async function updateInvoiceComplete(id_user, id_client, id_item) {
    fetch(api.endpoint + "/api/invoice/", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_invoice: id,
        user_id: id_user,
        client_id: id_client,
        img: "",
        number,
        date_invoice: dateInvoice,
        date_due: dateDue,
        id_item,
        comment,
        subtotal,
        tax,
        discount,
        total,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (!responseJson.error) {
          window.open(`https://lit-forest-43463.herokuapp.com/#/invoice/${responseJson._id}`);
          //navigate(`/${responseJson._id}`);
          window.location.reload();
        } else {
          console.log("Hubo un error la consulta.");
          console.error(responseJson.error);
        }
      })
      .catch((error) => {
        console.log("Hubo un error la consulta.");
        console.error(error);
      });
  }
  //Función que valida formulario y envia a funciones con fetch para actualizar invoice
  const updateInvoice = async () => {
    if (userCompany && userName && website && phone && email) {
      const strongRegex = new RegExp(
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      );
      if (!isNaN(phone) && strongRegex.test(email)) {
        const id_user = await updateUserCompany(0);
        //Validar que haya datos de cliente
        if (
          clientCompany ||
          clientName ||
          clientAddress ||
          clientCity ||
          clientCountry
        ) {
          if (!client_id) {
            const id_client = await uploadUserCompany(1);
            //Validar que haya item
            if (idItem || description || quantity || price) {
              if (item_id) {
                const id_item = await updateItem();
                await updateInvoiceComplete(id_user, id_client, id_item);
              } else {
                const id_item = await uploadItem();
                await updateInvoiceComplete(id_user, id_client, id_item);
              }
            } else {
              await updateInvoiceComplete(id_user, id_client, null);
            }
          } else {
            const id_client = await updateUserCompany(1);
            //Validar que haya item
            if (idItem || description || quantity || price) {
              if (item_id) {
                const id_item = await updateItem();
                await updateInvoiceComplete(id_user, id_client, id_item);
              } else {
                const id_item = await uploadItem();
                await updateInvoiceComplete(id_user, id_client, id_item);
              }
            } else {
              await updateInvoiceComplete(id_user, id_client, null);
            }
          }
        } else {
          //Validar que haya item
          if (idItem || description || quantity || price) {
            if (item_id) {
              const id_item = await updateItem();
              await updateInvoiceComplete(id_user, null, id_item);
            } else {
              const id_item = await uploadItem();
              await updateInvoiceComplete(id_user, null, id_item);
            }
          } else {
            await updateInvoiceComplete(id_user, null, null);
          }
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <div class="invoice-container-global">
        <div class="invoice-container">
          <div class="invoice-top">
            <div class="invoice-personal-info">
              <h2>Invoice</h2>
              {/*Datos de user's company*/}
              <div class="input-personal-info-single">
                <input
                  onChange={(e) => setUserCompany(e.target.value)}
                  value={userCompany}
                  type="text"
                  width="100%"
                  placeholder="Your Company*"
                  class="input-title"
                />
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  type="text"
                  width="100%"
                  placeholder="Your First and Last Name*"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
                  type="text"
                  width="100%"
                  placeholder="Company Website*"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setUserAddress(e.target.value)}
                  value={userAddress}
                  type="text"
                  width="100%"
                  placeholder="Company Address"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setUserCity(e.target.value)}
                  value={userCity}
                  type="text"
                  width="100%"
                  placeholder="City, State ZIP"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setUserCountry(e.target.value)}
                  value={usercountry}
                  type="text"
                  width="100%"
                  placeholder="Country"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="text"
                  width="100%"
                  placeholder="Phone No*"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  width="100%"
                  placeholder="Email Address*"
                  class="input-subtitle"
                />
              </div>
              <div class="input-personal-info-single">
                <input
                  onChange={(e) => setClientCompany(e.target.value)}
                  value={clientCompany}
                  type="text"
                  width="100%"
                  placeholder="Client's Company"
                  class="input-title"
                />
                <input
                  onChange={(e) => setClientName(e.target.value)}
                  value={clientName}
                  type="text"
                  width="100%"
                  placeholder="Client's Name"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setClientAddress(e.target.value)}
                  value={clientAddress}
                  type="text"
                  width="100%"
                  placeholder="Client's Address"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setClientCity(e.target.value)}
                  value={clientCity}
                  type="text"
                  width="100%"
                  placeholder="City, State ZIP"
                  class="input-subtitle"
                />
                <input
                  onChange={(e) => setClientCountry(e.target.value)}
                  value={clientCountry}
                  type="text"
                  width="100%"
                  placeholder="Country"
                  class="input-subtitle"
                />
              </div>
            </div>
            {/*Datos de logo y folio/fecha invoice*/}
            <div class="logo-date-container">
              <div class="logo-container">
                <input type="file" accept="image/*" class="input-logo" />
                <span class="label-logo-container">
                  Drag & drop a logo file or click to upload
                </span>
                {/*<img src={img} alt="Comany Logo"/>*/}
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
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
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
                    onChange={(e) => setDateInvoice(e.target.value)}
                    value={dateInvoice}
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
                    onChange={(e) => setDateDue(e.target.value)}
                    value={dateDue}
                    type="text"
                    width="30%"
                    class="input-invoice date"
                    placeholder="11111"
                  />
                </div>
              </div>
            </div>
          </div>
          {/*Datos de tabla de items*/}
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
                      onChange={(e) => setIdItem(e.target.value)}
                      value={idItem}
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
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
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
                      onChange={(e) => {
                        updateSubtotal(e.target.value, price);
                      }}
                      value={quantity}
                      type="text"
                      width="100%"
                      placeholder="0"
                      class="input-table quantity"
                    ></input>
                  </div>
                </td>
                <td colSpan="4">
                  <div>
                    <input
                      onChange={(e) => {
                        updateSubtotal(quantity, e.target.value);
                      }}
                      value={price}
                      type="text"
                      width="100%"
                      placeholder="$0.00"
                      class="input-table price"
                    ></input>
                  </div>
                </td>
              </tbody>
            </table>
          </div>
          {/*Datos de comment*/}
          <div class="invoice-bottom">
            <div class="comment-double-container">
              <div class="comment-container">
                <span color="#425B76">Notes:</span>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  placeholder="Any addiotional comments"
                ></textarea>
              </div>
            </div>
            {/*Datos de totales*/}
            <div class="total-container">
              <div class="total-row-single">
                <input
                  type="text"
                  width="100%"
                  placeholder="Subtotal:"
                  value="Subtotal:"
                  class="total-input"
                ></input>
                <span>{subtotal}</span>
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
                  <input
                    type="text"
                    width="100%"
                    placeholder="0"
                    value={tax}
                    onChange={(e) => {
                      updateTotal(subtotal, e.target.value, discount);
                    }}
                  ></input>
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
                  <input
                    type="text"
                    width="100%"
                    placeholder="0"
                    value={discount}
                    onChange={(e) => {
                      updateTotal(subtotal, tax, e.target.value);
                    }}
                  ></input>
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
                <span>{total}</span>
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
        {!id ? (
          <button
            class="primary-button generate-button"
            onClick={() => uploadInvoice()}
          >
            Generate invoice
          </button>
        ) : (
          <div>
            <button
              class="primary-button edit-button"
              onClick={() => updateInvoice()}
            >
              Edit invoice
            </button>
            <button
              class="primary-button delete-button"
              onClick={() => deleteInvoice()}
            >
              Delete invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;