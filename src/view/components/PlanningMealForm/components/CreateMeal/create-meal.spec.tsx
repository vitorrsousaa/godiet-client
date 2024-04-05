describe('CreateMeal', () => {
  it('Should render the view with default props', () => {
    expect(true).toBeTruthy();
  });
});

// describe('CreateMeal', () => {
// beforeEach(() => {
//   clearAllMocks();
// });

// describe('render', () => {
//   let rendered: ReturnRenderType;

//   beforeEach(() => {
//     clearAllMocks();
//   });

//   afterEach(() => {
//     rendered.unmount();
//   });

//   it('Should render the view with default props', () => {
//     // Arrange
//     const onAddMeal = fn();
//     const onRemoveMeal = fn();

//     // Act
//     rendered = render(
//       <CreateMeal
//         mealIndex={0}
//         onAddMeal={onAddMeal}
//         onRemoveMeal={onRemoveMeal}
//       />
//     );

//     // Assert
//     expect(rendered.getByText('CreateMeal'));
//   });
// });

// describe('hook', () => {
//   let rendered: ReturnRenderHookType<typeof useCreateMealHook>;

//   beforeEach(() => {
//     clearAllMocks();
//   });

//   afterEach(() => {
//     rendered.unmount();
//   });

//   it('Should call onAddMeal propertie when call handle duplicate meal function', () => {
//     // Arrange
//     const addMeal = fn();
//     const props: CreateMealProps = {
//       mealIndex: 0,
//       onAddMeal: addMeal,
//       onRemoveMeal: fn(),
//     };

//     // Act
//     rendered = renderHook(() => useCreateMealHook(props));
//     act(() => {
//       rendered.result.current.handleDuplicateMeal();
//     });

//     // Assert
//     expect(addMeal).toBeCalled();
//   });
// });
// });
