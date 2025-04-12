# Chat Application Database Design

## System Functions

### 1. **Users**:

- **User Registration**: Add a new user to the `users` table.
- **Update User Information**: Update user details such as email, password, avatar, status, etc.
- **Login Authentication**: Verify the account with password and account status.
- **Activate/Lock Account**: Change the account status from `pending` to `active`, `inactive`, `locked`, or `deleted`.

### 2. **Friendships**:

- **Send Friend Request**: Add a record with status `pending` when user A sends a friend request to user B.
- **Accept/Reject Friend Request**: Update the friendship status to `accepted` or `rejected` based on the action taken.
- **Block/Unblock User**: Update the friendship status to `blocked` or `unfriended` based on user actions.

### 3. **Conversations**:

- **Create/Update Conversation**: Add or update conversations with types `private` or `group`.
- **Add Members**: Add members to conversations with roles (`admin`, `member`).
- **Delete Conversation**: Remove a conversation from the system.

### 4. **Messages**:

- **Send/Update/Delete Message**: Send a message to a conversation, update its content, or delete it.
- **Message Reactions**: Users can react to messages with options like `like`, `love`, `haha`, etc.
- **Message Attachments**: Attach files to messages and manage them.

### 5. **Polls and Poll Options**:

- **Create/Update/Delete Poll**: Admin users can create, update, or delete polls within conversations.
- **Poll Options**: Admins add options for users to vote on. Each option can receive votes, and vote counts are tracked.
- **Vote on Poll**: Users can vote on available options in active polls.
- **View Poll Results**: Track which option has the most votes, including vote counts.

  _Related Tables:_

  - `polls`: Stores the main poll information, including the question, creator, expiration time, and active status.
  - `poll_options`: Stores the options for each poll.
  - `poll_votes`: Stores votes cast by users, linking users to the poll options they've selected.

  **Key Functions:**

  - Create polls and add options for users to vote.
  - Track votes in `poll_votes`, storing which user voted for which option.
  - View poll results by counting votes for each option in the poll.

### 6. **Video Calls**:

- **Create/Update Video Call**: Initiate a video call for a conversation, and update its status (ongoing, ended).
- **Manage Call Participants**: Track users joining, leaving, or missing the call.

### Run database

- run migration: `yarn run migration:generate  ./libs/database/src/migrations/update-id-user`

### api lifecycle

- Middleware: Xử lý request ban đầu (log, xác thực, kiểm tra).
- Guards: Kiểm tra quyền truy cập (đảm bảo yêu cầu hợp lệ trước khi tiếp tục).
- Interceptors (Pre-controller): Thực hiện thao tác trước khi dữ liệu đến controller (ví dụ: logging, chuyển đổi dữ liệu).
- Pipes: Validate và chuyển đổi dữ liệu đầu vào.
  Controller: Xử lý logic chính của route.
- Service: Xử lý nghiệp vụ (truy vấn cơ sở dữ liệu, logic tính toán).
- Interceptors (Post-request): Thực hiện thao tác sau khi controller xử lý (ví dụ: thay đổi response, logging).
- Exception Filters: Bắt lỗi và trả về lỗi cho client.
- Server Response: Trả về kết quả cuối cùng cho client.

### Git convention

- `<type>(<scope>): <short description>`
- Một số type phổ biến:

* feat: Thêm tính năng mới
* fix: Sửa bug
* chore: Thay đổi lặt vặt không ảnh hưởng logic (ví dụ: update dependency)
* refactor: Refactor code, không thay đổi logic

- docs: Thêm hoặc sửa tài liệu
- test: Thêm hoặc sửa test
- style: Thay đổi style code (formatting, indent, v.v...)
