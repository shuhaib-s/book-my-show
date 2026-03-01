import { Router } from "express";
import { showController } from "../../containers/show.container";
import { authMiddleware } from "../../infrastructure/auth/auth.middleware";
import roleCheck from "../../infrastructure/auth/permission.middleware";
import { ROLES } from "../../constants/roles";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Shows
 *   description: Show management endpoints
 */

/**
 * @swagger
 * /api/shows/active:
 *   get:
 *     summary: Get active shows
 *     tags: [Shows]
 *     parameters:
 *       - in: query
 *         name: theaterId
 *         schema:
 *           type: string
 *         description: Filter by theater ID
 *       - in: query
 *         name: movieId
 *         schema:
 *           type: string
 *         description: Filter by movie ID
 *     responses:
 *       200:
 *         description: Active shows fetched successfully
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
 *                     $ref: '#/components/schemas/Show'
 */
router.get("/active", showController.getActiveShows);

router.use(authMiddleware, roleCheck([ROLES.THEATER_OWNER,ROLES.ADMIN]));

/**
 * @swagger
 * /api/shows:
 *   post:
 *     summary: Create a new show
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theaterId:
 *                 type: string
 *               screenId:
 *                 type: string
 *               movieId:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               isActive:
 *                 type: boolean
 *               price:
 *                 type: number
 *             required:
 *               - theaterId
 *               - screenId
 *               - movieId
 *               - startTime
 *               - endTime
 *               - isActive
 *               - price
 *     responses:
 *       201:
 *         description: Show created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Show'
 */
router.post("/", showController.createShow);

/**
 * @swagger
 * /api/shows:
 *   get:
 *     summary: Get all shows
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Shows fetched successfully
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
 *                     $ref: '#/components/schemas/Show'
 */
router.get("/", showController.getShows);

/**
 * @swagger
 * /api/shows/{id}:
 *   get:
 *     summary: Get a show by ID
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Show fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Show'
 */
router.get("/:id", showController.getShowById);

/**
 * @swagger
 * /api/shows/{id}:
 *   put:
 *     summary: Update a show
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Show ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theaterId:
 *                 type: string
 *               screenId:
 *                 type: string
 *               movieId:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               isActive:
 *                 type: boolean
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Show updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Show'
 */
router.put("/:id", showController.updateShow);

/**
 * @swagger
 * /api/shows/{id}:
 *   delete:
 *     summary: Delete a show
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Show deleted successfully
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
router.delete("/:id", showController.deleteShow);

/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         theaterId:
 *           type: string
 *         screenId:
 *           type: string
 *         movieId:
 *           type: string
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         isActive:
 *           type: boolean
 *         price:
 *           type: number
 */
export default router;