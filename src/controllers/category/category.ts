import { Request, Response } from "express";
import { CategoryForm } from "../../types";
import { categoryService } from "../../services";
import { Responses } from "../../utils";


export const createCategory = async (req: Request, res: Response) => {
  try {
    const payload: Omit<CategoryForm, 'id'> = req.body

    const results = await categoryService.createCategory(payload)
    Responses.SuccessCreate(res, results)
  } catch (error:any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const results = await categoryService.getAllCategory()
    Responses.SuccessRead(res, results)
  } catch (error: any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const results = await categoryService.getCategoryById(id)
    Responses.SuccessRead(res, results)
  } catch (error:any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const payload: Omit<CategoryForm, 'id'> = req.body
    
    const results = await categoryService.updateCategory(id, payload)
    Responses.SuccessRead(res, results)
  } catch (error:any) {
    Responses.ErrorBadRequest(res, error)
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const result = await categoryService.deletedCategory(id)
    Responses.SuccessRead(res, result)
  } catch (error: any) {
    Responses.ErrorBadRequest(res, error)
  }
}