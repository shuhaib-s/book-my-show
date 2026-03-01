import { Router } from "express";
import { theaterController } from "../../containers/theater.container";
import roleCheck from "../../infrastructure/auth/permission.middleware";
import { ROLES } from "../../constants/roles";
import { authMiddleware } from "../../infrastructure/auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Theaters
 *   description: Theater management endpoints
 */

/**
 * @swagger
 * /api/theaters:
 *   get:
 *     summary: Get all theaters
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter theaters by owner user ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for theater name or location
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Theaters fetched successfully
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
 *                     $ref: '#/components/schemas/Theater'
 */
router.get("/", authMiddleware, theaterController.getTheaters);

/**
 * @swagger
 * /api/theaters/{id}:
 *   get:
 *     summary: Get a theater by ID
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     responses:
 *       200:
 *         description: Theater fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Theater'
 */
router.get("/:id", authMiddleware, theaterController.getTheaterById);

router.use(authMiddleware, roleCheck([ROLES.THEATER_OWNER,ROLES.ADMIN]));

/**
 * @swagger
 * /api/theaters:
 *   post:
 *     summary: Create a new theater
 *     tags: [Theaters]
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
 *               location:
 *                 type: string
 *             required:
 *               - name
 *               - location
 *             
 *     responses:
 *       201:
 *         description: Theater created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Theater'
 */
router.post("/", theaterController.createTheater);

/**
 * @swagger
 * /api/theaters/{id}:
 *   put:
 *     summary: Update a theater
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               website:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *                 description: Only admins can change the status
 *     responses:
 *       200:
 *         description: Theater updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Theater'
 */
router.put("/:id", theaterController.updateTheater);

/**
 * @swagger
 * /api/theaters/{id}:
 *   delete:
 *     summary: Delete a theater
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     responses:
 *       200:
 *         description: Theater deleted successfully
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
router.delete("/:id", theaterController.deleteTheater);

/**
 * @swagger
 * /api/theaters/{id}/application/status:
 *   put:
 *     summary: Approve or reject a theater application
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Theater status changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Theater'
 */
router.put("/:id/application/status",roleCheck([ROLES.ADMIN]), theaterController.approveOrRejectTheaterApplication);

/**
 * @swagger
 * components:
 *   schemas:
 *     Theater:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         pincode:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         website:
 *           type: string
 *         description:
 *           type: string
 */
export default router;