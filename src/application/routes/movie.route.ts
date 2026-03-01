import { Router } from "express";
const router = Router();
import { movieController } from "../../containers/movie.container";
import { validate } from "../../infrastructure/http/middlewares/validate.middleware";
import movieSchema from "../validators/movie.validator";
import { authMiddleware } from "../../infrastructure/auth/auth.middleware";
import roleCheck from "../../infrastructure/auth/permission.middleware";
import { ROLES } from "../../constants/roles";

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management endpoints
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Movies fetched successfully
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
 *                     $ref: '#/components/schemas/Movie'
 */
router.get("/",  movieController.getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 */
router.get("/:id",  movieController.getMovieById);

router.use(authMiddleware,roleCheck([ROLES.ADMIN]));

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *               description:
 *                 type: string
 *                 minLength: 10
 *               duration:
 *                 type: number
 *                 minimum: 1
 *                 description: Duration in minutes
 *               language:
 *                 type: string
 *                 minLength: 2
 *               releaseDate:
 *                 type: string
 *                 format: date
 *             required:
 *               - title
 *               - description
 *               - duration
 *               - language
 *               - releaseDate
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 */
router.post("/", validate(movieSchema), movieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *               description:
 *                 type: string
 *                 minLength: 10
 *               duration:
 *                 type: number
 *                 minimum: 1
 *                 description: Duration in minutes
 *               language:
 *                 type: string
 *                 minLength: 2
 *               releaseDate:
 *                 type: string
 *                 format: date
 *             required:
 *               - title
 *               - description
 *               - duration
 *               - language
 *               - releaseDate
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 */
router.put("/:id", validate(movieSchema), movieController.updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
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
router.delete("/:id", movieController.deleteMovie);

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         duration:
 *           type: number
 *         language:
 *           type: string
 *         releaseDate:
 *           type: string
 *           format: date
 */
export default router;