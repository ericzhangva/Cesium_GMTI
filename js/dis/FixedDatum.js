/**
 * Section 5.2.18. Fixed Datum Record
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.FixedDatum = function()
{
   /** ID of the fixed datum */
   this.fixedDatumID = 0;

   /** Value for the fixed datum */
   this.fixedDatumValue = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.fixedDatumID = inputStream.readInt();
       this.fixedDatumValue = inputStream.readInt();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUInt(this.fixedDatumID);
       outputStream.writeUInt(this.fixedDatumValue);
};
}; // end of class
