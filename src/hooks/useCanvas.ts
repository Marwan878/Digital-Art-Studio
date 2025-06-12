import { useEffect, useReducer } from "react";
import { Shape } from "../classes";
import type { TAction, TCanvasState } from "../types";
import { convertJSONShapesToShapes, loadDrawing } from "../utils";
import { useNavigate } from "react-router-dom";

const initialState: TCanvasState = {
  shapes: [],
  currentShape: null,
  isDrawing: false,
};

function reducer(state: TCanvasState, action: TAction): TCanvasState {
  if (action.type === "cleared_canvas") {
    return initialState;
  } else if (action.type === "completed_shape") {
    const currentShape = action.payload;
    if (!currentShape) {
      throw new Error("Attempted to complete a null shape.");
    }

    currentShape.isComplete = true;
    currentShape.onComplete?.();
    return {
      shapes: [...state.shapes, currentShape],
      currentShape: null,
      isDrawing: false,
    };
  } else if (action.type === "undone") {
    return {
      ...state,
      shapes: state.shapes.slice(0, -1),
    };
  } else if (action.type === "set_current_shape") {
    return {
      ...state,
      currentShape: action.payload,
    };
  } else if (action.type === "set_is_drawing") {
    return {
      ...state,
      isDrawing: action.payload,
    };
  } else if (action.type === "set_shapes") {
    return {
      ...state,
      shapes: action.payload,
    };
  } else {
    throw new Error(`Action type: ${(action as TAction).type} doesn't exist.`);
  }
}

const useCanvas = (urlPaintingId: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    if (urlPaintingId) {
      const drawing = loadDrawing(urlPaintingId);
      if (drawing) {
        dispatch({
          type: "set_shapes",
          payload: convertJSONShapesToShapes(
            JSON.parse(drawing.shapes) as Shape[]
          ),
        });
      } else {
        navigate("/canvas", { replace: true });
      }
    }
  }, [urlPaintingId, navigate]);

  return {
    shapes: state.shapes,
    currentShape: state.currentShape,
    isDrawing: state.isDrawing,
    setCurrentShape: (currentShape: Shape | null) =>
      dispatch({ type: "set_current_shape", payload: currentShape }),
    setIsDrawing: (isDrawing: boolean) =>
      dispatch({ type: "set_is_drawing", payload: isDrawing }),
    completeShape: (currentShape: Shape) =>
      dispatch({ type: "completed_shape", payload: currentShape }),
    clearCanvas: () => dispatch({ type: "cleared_canvas" }),
    undoLast: () => dispatch({ type: "undone" }),
    setShapes: (shapes: Shape[]) =>
      dispatch({ type: "set_shapes", payload: shapes }),
  };
};

export default useCanvas;
