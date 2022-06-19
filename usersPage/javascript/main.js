const getEle = (id) => document.getElementById(id);

import { Service } from "./service/index.js";
import { Product } from "./service/product.js";
import { CartProduct } from "./service/cardProduct.js";

let service = new Service();
let cart = [];

const renderList = (data) => {
  // console.log(data);
  let content = "";
  // let id = 0;

  data.forEach((listAPI) => {
    // id += 1;
    content += `
        <div class="card col-3">
            <img
            src="${listAPI.img}"
            class="img-fluid py-5"
            style="width: 15.625em"
            alt=""
            />
            <div class="card-body" id="card_body${listAPI.id}">
              <h3 class="card-title">${listAPI.name}</h3>
              <div class="card-text pb-4">
                  <a
                  href="#demo-${listAPI.id}"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="demo"
                  >
                  Thông tin sản phẩm
                  </a>
                  <p id="demo-${listAPI.id}" class="collapse">
                  Camera sau: ${listAPI.backCamera} <br />
                  Camera trước: ${listAPI.frontCamera} <br />
                  Màn hình: ${listAPI.screen} <br />
                  Là một sản phẩm có "${listAPI.desc}"
                  </p>
              </div>
              <div class="d-flex" id="ftAdd${listAPI.id}">
                <button class="btn btn-success ml-2" id="btnAdd${listAPI.id}" onclick="addProduct(${listAPI.id})">ADD</button>
                <p>$${listAPI.price}  </p>
              </div>
            </div>
        </div>
        `;
  });
  getEle("listSP").innerHTML = content;
};

// lấy API sản phẩm
const getList = () => {
  service
    .getListAPI()
    .then((result) => {
      renderList(result.data);
      // console.log(result.data);
      // addListproduct(result.data);
      // PushADD(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getList();

// select option
window.OnChangePhone = (option) => {
  service
    .getListAPI()
    .then((result) => {
      let arrOpt = result.data;
      if (option !== "all") {
        arrOpt = arrOpt.filter((ele) => ele.type === option);
      }
      renderList(arrOpt);
    })
    .catch((error) => {
      console.log(error);
    });
};
//Cau 5:
window.addProduct = (id) => {
  //Cộng dồn total-quantity
  let totalQty = document.querySelector(".total-qty").innerHTML * 1;
  document.querySelector(".total-qty").innerHTML = ++totalQty;

  //Thay btnAdd => <div class='quantity-control'></div>
  getEle(`btnAdd${id}`).style.display = "none";
  getEle(`ftAdd${id}`).innerHTML += `
  <div class="bg-dark d-inline-block" style="color:white">
    <div class="item-row flus-minus d-flex align-items-center">
      <a href="#" class="btn add-btn d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
        </svg>
      </a>
      1
      <a href="#" class="btn minus-btn d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
        </svg>
      </a>
    </div>
  </div>
  `;

  //div giỏ hàng hiển thị thông tin product (product.id === id)
  service.getProductById(id).then((result) => {
    let product = result.data;
    getEle("itemProduct").innerHTML += `
      <div class="item-product mt-2">
            <div class="item-row">
              <img
                class="img-fluid"
                src="${product.img}"
                alt=""
              />
            </div>
            <div class="item-row">${product.name}</div>
            <div class="item-row flus-minus d-flex align-items-center">
                <a href="#" class="btn add-btn d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                  >
                    <path
                      d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                    />
                  </svg>
                </a>
                1
                <a
                  href="#"
                  class="btn minus-btn d-flex align-items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                  >
                    <path
                      d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                    />
                  </svg>
                </a>
            </div>
            <div class="item-row">$ ${product.price}</div>
            <div class="item-row">
              <a href="#" type="button" class="clear-product">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
                  />
                </svg>
              </a>
            </div>
      </div>
    `;
  });
};

// const addListproduct = (data, quantity) => {
//   let arrProduct = [];
//   let content = "";
//   let product = new Product(data.id, data.name, data.price, data.img);
//   let quanPro = new Quantity(quantity);
//   cartpro = new CartProduct(product, quanPro);
//   arrProduct.push(cartpro);
//   arrProduct.forEach((ele) => {
//     content += `
//   <div class="item-product mt-2">
//       <div class="item-row">
//         <img
//           class="img-fluid"
//           src="https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg"
//           alt=""
//         />
//       </div>
//       <div class="item-row">iphoneX</div>
//       <div class="item-row flus-minus d-flex align-items-center">
//           <a href="#" class="btn add-btn d-flex align-items-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 256 512"
//             >
//               <path
//                 d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
//               />
//             </svg>
//           </a>
//           1
//           <a
//             href="#"
//             class="btn minus-btn d-flex align-items-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 256 512"
//             >
//               <path
//                 d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
//               />
//             </svg>
//           </a>
//       </div>
//   <div class="item-row">$ 1000</div>
//   <div class="item-row">
//     <a href="#" type="button" class="clear-product">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 448 512"
//       >
//         <path
//           d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
//         />
//       </svg>
//     </a>
//   </div>
// </div>
//     `;
//   });
//   getEle("itemProduct").innerHTML = content;
//   // console.log(arrProduct);
//   // });
// };

// const PushADD = (data) => {
//   // push btn add
//   let quantity = 1;
//   let btnADD = document.getElementsByClassName("btn-success");
//   for (let i = 0; i < btnADD.length; i++) {
//     btnADD[i].onclick = () => {
//       // console.log(i);
//       // console.log(data[i].id);
//       addListproduct(data[i], quantity);
//     };
//   }
// };
