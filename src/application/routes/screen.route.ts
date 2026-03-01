import { Router } from "express";
import { screenController } from "../../containers/screen.container";
import { authMiddleware } from "../../infrastructure/auth/auth.middleware";
import roleCheck from "../../infrastructure/auth/permission.middleware";
import { ROLES } from "../../constants/roles";
 
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Screens
 *   description: Screen management endpoints
 */

/**
 * @swagger
 * /api/screens/theater/{theaterId}:
 *   get:
 *     summary: Get all screens for a theater
 *     tags: [Screens]
 *     parameters:
 *       - in: path
 *         name: theaterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     responses:
 *       200:
 *         description: Screens fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Screen'
 */
router.get("/theater/:theaterId", screenController.getScreensByTheaterId);

/**
 * @swagger
 * /api/screens/{id}:
 *   get:
 *     summary: Get a screen by ID
 *     tags: [Screens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Screen ID
 *     responses:
 *       200:
 *         description: Screen fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Screen'
 */
router.get("/:id",  screenController.getScreenById);

router.use(authMiddleware, roleCheck([ROLES.THEATER_OWNER,ROLES.ADMIN]));

/**
 * @swagger
 * /api/screens:
 *   post:
 *     summary: Create a new screen
 *     tags: [Screens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               theaterId:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *             required:
 *               - name
 *               - theaterId
 *     responses:
 *       201:
 *         description: Screen created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Screen'
 */
router.post("/", screenController.createScreen);

/**
 * @swagger
 * /api/screens/{id}:
 *   put:
 *     summary: Update a screen
 *     tags: [Screens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Screen ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               theaterId:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Screen updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Screen'
 */
router.put("/:id", screenController.updateScreen);

/**
 * @swagger
 * /api/screens/{id}:
 *   delete:
 *     summary: Delete a screen
 *     tags: [Screens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Screen ID
 *     responses:
 *       200:
 *         description: Screen deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.delete("/:id", screenController.deleteScreen);

/**
 * @swagger
 * components:
 *   schemas:
 *     Screen:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         theaterId:
 *           type: string
 *         totalSeats:
 *           type: integer
 *         createdBy:
 *           type: string
 */
export default router;