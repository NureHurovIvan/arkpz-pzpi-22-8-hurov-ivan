/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           description: User's role
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         password: password123
 *         role: user
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: A user with this email already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User authentication
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - user_id
 *         - make
 *         - model
 *         - year
 *         - vin_number
 *       properties:
 *         user_id:
 *           type: string
 *           description: User ID who owns the vehicle
 *         make:
 *           type: string
 *           description: Car make
 *         model:
 *           type: string
 *           description: Car model
 *         year:
 *           type: integer
 *           description: Year of manufacture
 *         vin_number:
 *           type: string
 *           description: Vehicle Identification Number
 *       example:
 *         user_id: "60d1c7f5f68a6c7d0cd4e6f5"
 *         make: Toyota
 *         model: Camry
 *         year: 2022
 *         vin_number: "1HGBH41JXMN109186"
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle successfully added
 *       400:
 *         description: Error while adding the vehicle
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /vehicles/{vehicle_id}:
 *   delete:
 *     summary: Delete vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: vehicle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle successfully deleted
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Maintenance:
 *       type: object
 *       required:
 *         - vehicle_id
 *         - maintenance_type
 *         - maintenance_date
 *         - mileage
 *       properties:
 *         vehicle_id:
 *           type: string
 *           description: Vehicle ID
 *         maintenance_type:
 *           type: string
 *           description: Type of maintenance
 *         maintenance_date:
 *           type: string
 *           format: date
 *           description: Date of maintenance
 *         mileage:
 *           type: integer
 *           description: Mileage of the vehicle at the time of maintenance
 *       example:
 *         vehicle_id: "60d1c7f5f68a6c7d0cd4e6f5"
 *         maintenance_type: "Oil Change"
 *         maintenance_date: "2024-12-20"
 *         mileage: 15000
 */

/**
 * @swagger
 * /maintenance:
 *   post:
 *     summary: Add a maintenance record
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       201:
 *         description: Maintenance record successfully added
 *       400:
 *         description: Error while adding the record
 *       500:
 *         description: Server error
 */
