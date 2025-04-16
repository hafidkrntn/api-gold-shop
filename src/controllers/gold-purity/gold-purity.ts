import { Request, Response } from "express";
import { GoldPurityForm } from "../../types";
import { goldPurityService } from "../../services";
import { Responses } from "../../utils";

export const createGoldPurity = async (req: Request, res: Response) => {
  try {
    const payload: Omit<GoldPurityForm, 'id'> = req.body;

    if (payload.karat <= 0) {
      throw new Error('Karat must be greater than 0')
    }

    const newGoldPurity = await goldPurityService.createGoldPurity(payload)
    Responses.SuccessCreate(res, newGoldPurity)
  } catch (error:any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const getGoldPurityPagination = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const results = await goldPurityService.getGoldPuritiesPagination(page, limit)
    Responses.SuccessRead(res, results)
  } catch (error: any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const getGoldPurity = async (req: Request, res: Response) => {
  try {
    const getData = await goldPurityService.getAllGoldPurities()
    Responses.SuccessRead(res, getData)
  } catch (error: any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const getGoldPurityById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await goldPurityService.getGoldPurityById(id)
    Responses.SuccessRead(res, result)
  } catch (error: any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const updateGoldPurity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const payload: Omit<GoldPurityForm, 'id'> = req.body;

    if (payload.karat <= 0) {
      throw new Error('Karat must be greater than 0')
    }

    const results = await goldPurityService.updateGoldPurity(id, payload)
    Responses.SuccessUpdate(res, results)
  } catch (error:any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const deleteGoldPurity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const result = await goldPurityService.deleteGoldPurity(id)
    Responses.SuccessDelete(res, result)
  } catch (error: any) {
    Responses.ErrorBadRequest(res, error)
  }
}

