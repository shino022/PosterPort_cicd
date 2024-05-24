import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import cardValidator from "card-validator";

const PaymentPage = () => {
  // State to manage the visibility of the success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm();

  //   const cardNumber = watch("cardNumber");
  // Watch all form inputs
  const allInputs = watch();

  // Specifically access the card number for validation
  const cardNumber = allInputs.cardNumber;

  const onSubmit = async (data) => {
    console.log("Payment Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setShowSuccessMessage(true);
  };
  useEffect(() => {
    // This effect clears the success message when any form field changes.
    const subscription = watch(() => {
      if (showSuccessMessage) {
        setShowSuccessMessage(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, showSuccessMessage]);

    // Validate card number and get card type
    const cardNumberValidation = cardValidator.number(cardNumber);
    const cardType = cardNumberValidation.card
      ? cardNumberValidation.card.type
      : undefined;

    //function to format card number
    const formatCardNumber = (event) => {
      let { value } = event.target;
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1-") // Add dash every four digits
        .substring(0, 19); // Limit length including dashes
      setValue("cardNumber", value, { shouldValidate: true });
    };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="firstname"
            className="mt-2 block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstname"
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder="John"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}

          <label
            htmlFor="lastname"
            className="mt-2 block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastname"
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Doe"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}

          <label
            htmlFor="cardnumber"
            className="mt-2 block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            id="cardnumber"
            type="text"
            minLength={16}
            {...register("cardNumber", {
              required: "Card number is required",
              validate: (value) =>
                value.replace(/\D/g, "").length === 16 ||
                "Card number must be 16 digits",
            })}
            value={cardNumber}
            onChange={formatCardNumber}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {cardType && (
            <span className="text-green-500 block">
              Card Type: {cardType.toUpperCase()}
            </span>
          )}
          {errors.cardNumber && (
            <span className="text-red-500">{errors.cardNumber.message}</span>
          )}

          <label
            htmlFor="cvv"
            className="mt-2 block text-sm font-medium text-gray-700"
          >
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            minLength={3}
            maxLength={3}
            {...register("cvv", {
              required: "3 digit CVV is required",
            })}
            className="mt-1 block w-1/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
          />
          {errors.cvv && (
            <span className="text-red-500">{errors.cvv.message}</span>
          )}
        </div>
        {/* More inputs for expiry, CVV, etc. */}

        {isSubmitting && <p className="text-gray-500">Processing payment...</p>}
        {showSuccessMessage && (
          <p className="text-green-500">Payment successful!</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
