# LENSCAMDIO Website

## 📸 Giới thiệu
Website đặt lịch studio chụp ảnh và cho thuê thiết bị chuyên nghiệp.

## 🚀 Cách chạy website

### Cách 1: Mở trực tiếp
1. Giải nén file ZIP
2. Double-click vào file `index.html`
3. Website sẽ mở trong trình duyệt

### Cách 2: Chạy với Live Server (Khuyến nghị)
1. Cài đặt Visual Studio Code
2. Cài extension "Live Server"
3. Mở thư mục website trong VS Code
4. Click phải vào `index.html` → "Open with Live Server"

## 📄 Cấu trúc file
- `index.html` - Trang chủ
- `studio-booking.html` - Đặt lịch studio
- `camera-rental.html` - Thuê máy ảnh
- `my-booking.html` - Quản lý booking
- `contact.html` - Liên hệ
- `styles.css` - File CSS chính
- `script.js` - File JavaScript chính

## 🎨 Tính năng
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Đặt lịch studio online
- ✅ Giỏ hàng thuê thiết bị
- ✅ Quản lý booking
- ✅ Chat box AI
- ✅ Google Maps tích hợp
- ✅ Form liên hệ

## 💻 Công nghệ sử dụng
- HTML5
- CSS3 (với CSS Grid & Flexbox)
- JavaScript (Vanilla JS)
- Bootstrap Icons
- Font Awesome
- Google Fonts

## 📱 Responsive
Website tối ưu cho:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Tùy chỉnh
- Màu sắc: Chỉnh sửa trong `:root` của file `styles.css`
- Nội dung: Chỉnh sửa trực tiếp trong các file HTML
- Tính năng: Chỉnh sửa trong file `script.js`

## 🚀 Deployment (Triển khai)

### Render.com
Website này được thiết kế để deploy trên Render với cấu hình static site:

1. **Cách 1: Sử dụng render.yaml (Khuyến nghị)**
   - File `render.yaml` đã được cấu hình sẵn
   - Chỉ cần connect repository với Render

2. **Cách 2: Cấu hình thủ công**
   - **Build Command:** Để trống hoặc `echo "Static site"`
   - **Publish Directory:** `.` (thư mục gốc)
   - **Environment:** Static Site

### Netlify
- Drag & drop thư mục project vào Netlify
- File `_redirects` đã được cấu hình cho SPA routing

### Vercel
- Import repository từ GitHub
- Framework: Other
- Build Command: Để trống
- Output Directory: `.`

## 📞 Hỗ trợ
Nếu cần hỗ trợ, vui lòng liên hệ.

---
© 2024 LENSCAMDIO. All rights reserved. 