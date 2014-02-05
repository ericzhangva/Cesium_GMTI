/**
 * Used for XML compatability. A container that holds PDUs
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.PduContainer = function()
{
   /** Number of PDUs in the container list */
   this.numberOfPdus = 0;

   /** record sets */
    this.pdus = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.numberOfPdus = inputStream.readInt();
       for(var idx = 0; idx < this.numberOfPdus; idx++)
       {
           var anX = new dis.Pdu();
           anX.initFromBinaryDIS(inputStream);
           this.pdus.push(anX);
       }

  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeInt(this.numberOfPdus);
       for(var idx = 0; idx < this.pdus.length; idx++)
       {
           pdus[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
